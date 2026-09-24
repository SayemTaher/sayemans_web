// ─────────────────────────────────────────────────────────────
// SAYEMANS Cloudflare Worker
// • /api/contact   → validates a project inquiry and emails it (Resend)
// • /api/subscribe → emails a newsletter sign-up notification
// • everything else → static site from ./dist (env.ASSETS)
//
// Config (wrangler.toml [vars]):  CONTACT_TO, MAIL_FROM, CONFIRMATION_EMAILS
// Secret (Cloudflare dashboard → Settings → Variables & Secrets): RESEND_API_KEY
// ─────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'https://sayemans.org',
  'https://www.sayemans.org',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:8787',
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const clip = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Cloudflare preview URLs (*.workers.dev)
  try {
    return new URL(origin).hostname.endsWith('.workers.dev');
  } catch {
    return false;
  }
}

async function sendEmail(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

const row = (label, value) =>
  value
    ? `<tr><td style="padding:6px 16px 6px 0;color:#6e6e73;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1d1d1f">${value}</td></tr>`
    : '';

function inquiryEmail(d, meta) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,Helvetica,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px">
    <p style="margin:0 0 20px;font-size:13px;font-weight:600;letter-spacing:.2em;color:#1d1d1f">SAYEMANS</p>
    <div style="background:#fff;border-radius:18px;padding:28px">
      <h1 style="margin:0 0 6px;font-size:22px;color:#1d1d1f">New project inquiry</h1>
      <p style="margin:0 0 20px;color:#6e6e73;font-size:14px">Reply to this email to answer ${esc(d.name)} directly.</p>
      <table style="border-collapse:collapse;font-size:14px;width:100%">
        ${row('Name', esc(d.name))}
        ${row('Email', `<a href="mailto:${esc(d.email)}" style="color:#0066cc">${esc(d.email)}</a>`)}
        ${row('Company', esc(d.company))}
        ${row('Website', esc(d.website))}
        ${row('Services', esc(d.services.join(', ')))}
        ${row('Budget', esc(d.budget))}
        ${row('Timeline', esc(d.timeline))}
        ${row('Source', esc(d.source))}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f5f5f7;border-radius:12px;font-size:15px;line-height:1.6;color:#1d1d1f;white-space:pre-wrap">${esc(d.message)}</div>
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#86868b">Sent from sayemans.org · ${esc(meta.when)} · ${esc(meta.country)}${meta.landing ? ` · landed on ${esc(meta.landing)}` : ''}${meta.referrer ? ` · via ${esc(meta.referrer)}` : ''}</p>
  </div></body></html>`;
}

function confirmationEmail(d) {
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:-apple-system,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <p style="margin:0 0 20px;font-size:13px;font-weight:600;letter-spacing:.2em;color:#1d1d1f">SAYEMANS</p>
    <div style="background:#fff;border-radius:18px;padding:28px;font-size:15px;line-height:1.6;color:#1d1d1f">
      <p style="margin:0 0 12px">Hi ${esc(d.name.split(' ')[0])},</p>
      <p style="margin:0 0 12px">Thanks for reaching out. We received your message and will reply within one business day, usually with a few questions and a proposal for a short intro call.</p>
      <p style="margin:0">Speak soon,<br/>SAYEMANS</p>
    </div>
  </div></body></html>`;
}

async function handleContact(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid request.' });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (body.hp) return json(200, { ok: true });

  const d = {
    name: clip(body.name, 120),
    email: clip(body.email, 200).toLowerCase(),
    company: clip(body.company, 160),
    website: clip(body.website, 300),
    services: Array.isArray(body.services) ? body.services.slice(0, 12).map((s) => clip(s, 60)) : [],
    budget: clip(body.budget, 60),
    timeline: clip(body.timeline, 60),
    message: clip(body.message, 5000),
    source: clip(body.source, 60) || 'contact',
    consent: body.consent === true,
  };

  const errors = {};
  if (!d.name) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(d.email)) errors.email = 'A valid email is required.';
  if (d.message.length < 10) errors.message = 'Message is too short.';
  if (!d.consent) errors.consent = 'Consent is required.';
  if (Object.keys(errors).length) return json(422, { ok: false, errors });

  if (!env.RESEND_API_KEY) return json(503, { ok: false, error: 'Email service is not configured.' });

  const meta = {
    when: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' }),
    country: request.cf?.country || '',
    landing: clip(body.meta?.landing, 200),
    referrer: clip(body.meta?.referrer, 200),
  };

  try {
    const sent = await sendEmail(env, {
      from: env.MAIL_FROM,
      to: [env.CONTACT_TO],
      reply_to: d.email,
      subject: `New inquiry: ${d.name}${d.company ? ` (${d.company})` : ''}${d.services.length ? ` · ${d.services.join(', ')}` : ''}`.slice(0, 180),
      html: inquiryEmail(d, meta),
      text: `New project inquiry\n\nName: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\nWebsite: ${d.website}\nServices: ${d.services.join(', ')}\nBudget: ${d.budget}\nTimeline: ${d.timeline}\n\n${d.message}`,
    });

    // Auto-reply to the visitor. Needs a verified sending domain in Resend.
    if (env.CONFIRMATION_EMAILS === 'true') {
      await sendEmail(env, {
        from: env.MAIL_FROM,
        to: [d.email],
        reply_to: env.CONTACT_TO,
        subject: 'We received your message · SAYEMANS',
        html: confirmationEmail(d),
      }).catch((e) => console.error('confirmation failed', e.message));
    }

    return json(200, { ok: true, id: sent.id });
  } catch (err) {
    console.error('contact email failed', err.message);
    return json(502, { ok: false, error: 'Could not send your message. Please email us directly.' });
  }
}

async function handleSubscribe(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false });
  }
  const email = clip(body.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return json(422, { ok: false, error: 'Invalid email.' });
  if (!env.RESEND_API_KEY) return json(503, { ok: false, error: 'Email service is not configured.' });
  try {
    await sendEmail(env, {
      from: env.MAIL_FROM,
      to: [env.CONTACT_TO],
      subject: `New newsletter subscriber: ${email}`,
      text: `${email} subscribed via ${clip(body.source, 40) || 'website'} on ${new Date().toISOString()}.`,
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error('subscribe email failed', err.message);
    return json(502, { ok: false });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed.' });
      if (!originAllowed(request)) return json(403, { ok: false, error: 'Forbidden.' });
      if ((Number(request.headers.get('content-length')) || 0) > 20_000) return json(413, { ok: false, error: 'Too large.' });

      if (url.pathname === '/api/contact') return handleContact(request, env);
      if (url.pathname === '/api/subscribe') return handleSubscribe(request, env);
      return json(404, { ok: false, error: 'Not found.' });
    }

    return env.ASSETS.fetch(request);
  },
};
