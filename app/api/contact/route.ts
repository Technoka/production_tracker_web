import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ── Validation (mirrors client-side schema) ──────────────────────────────────
const ContactSchema = z.object({
  name:    z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  phone:   z.string().min(6).max(25).regex(/^[+\d\s\-().]+$/),
  email:   z.string().email().optional().or(z.literal('')),
});

// ── Rate limiting (simple in-memory; replace with Redis/Upstash in production) ─
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX       = 5;               // max 5 per IP per hour

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const times = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (times.length >= RATE_LIMIT_MAX) return true;
  submissions.set(ip, [...times, now]);
  return false;
}

// ── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data', details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, company, phone, email } = parsed.data;

  // Environment check
  const resendKey     = process.env.RESEND_API_KEY;
  const fromEmail     = process.env.RESEND_FROM_EMAIL;
  const contactEmail  = process.env.CONTACT_EMAIL;

  if (!resendKey || !fromEmail || !contactEmail) {
    console.error('[contact] Missing env vars: RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_EMAIL');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  // Send email via Resend
  try {
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from:    `Production Tracker <${fromEmail}>`,
      to:      contactEmail,
      replyTo: email || undefined,
      subject: `🆕 Nuevo lead: ${name} — ${company}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
          <div style="background: linear-gradient(135deg,#a20513,#c62828); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800;">
              🚀 Nuevo lead de Production Tracker
            </h1>
          </div>

          <table style="width:100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 12px; background: #f3f3f3; border-radius: 8px 8px 0 0; color: #5b403d; font-weight: 600; width: 140px;">Nombre</td>
              <td style="padding: 12px; background: #f3f3f3; border-radius: 8px 8px 0 0; color: #1a1c1c; font-weight: 700;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #5b403d; font-weight: 600; border-bottom: 1px solid #eeeeee;">Empresa</td>
              <td style="padding: 12px; color: #1a1c1c;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #5b403d; font-weight: 600; border-bottom: 1px solid #eeeeee;">Teléfono</td>
              <td style="padding: 12px; color: #1a1c1c; font-weight: 700;">
                <a href="tel:${phone}" style="color: #a20513;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #5b403d; font-weight: 600;">Email</td>
              <td style="padding: 12px; color: #1a1c1c;">
                ${email
                  ? `<a href="mailto:${email}" style="color: #a20513;">${email}</a>`
                  : '<span style="color:#8f706c; font-style:italic;">No proporcionado</span>'
                }
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #ffdad6; border-radius: 8px; font-size: 13px; color: #5b403d;">
            <strong>IP:</strong> ${ip} &nbsp;·&nbsp;
            <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

// Only POST allowed
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
