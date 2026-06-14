import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
  const CRON_SECRET = process.env.CRON_SECRET ?? "";
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aicreatoredge.com";
  // Verify secret
  const auth = req.headers.get("authorization");
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, slug, description } = await req.json();
  if (!title || !slug) {
    return NextResponse.json({ error: "Missing title or slug" }, { status: 400 });
  }

  try {
    // Fetch all contacts from audience
    const contactsRes = await resend.contacts.list({ audienceId: AUDIENCE_ID });
    const contacts = (contactsRes.data?.data ?? []).filter((c) => !c.unsubscribed);

    if (contacts.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const articleUrl = `${SITE_URL}/${slug}`;

    // Send email to each subscriber (batch of up to 100 via Resend batch API)
    const emails = contacts.map((c) => ({
      from: "AICreatorEdge <newsletter@aicreatoredge.com>",
      to: c.email,
      subject: `New Review: ${title}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e1b4b,#4c1d95);padding:32px 40px;">
          <a href="${SITE_URL}" style="text-decoration:none;display:flex;align-items:center;gap:10px;">
            <span style="display:inline-block;background:#4f46e5;border-radius:8px;padding:6px 10px;font-size:13px;font-weight:900;color:white;">AI</span>
            <span style="font-size:20px;font-weight:800;color:white;">Creator<span style="color:#a5b4fc;">Edge</span></span>
          </a>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;">New Review Published</p>
          <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#111827;line-height:1.3;">${title}</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#4b5563;line-height:1.6;">${description}</p>
          <a href="${articleUrl}" style="display:inline-block;background:#4f46e5;color:white;font-weight:700;font-size:15px;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Read the full review →
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            You're receiving this because you subscribed at <a href="${SITE_URL}" style="color:#6366f1;">${SITE_URL.replace('https://','')}</a>.
            <br>
            <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(c.email)}" style="color:#9ca3af;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }));

    // Send in batches of 100
    let sent = 0;
    for (let i = 0; i < emails.length; i += 100) {
      await resend.batch.send(emails.slice(i, i + 100));
      sent += Math.min(100, emails.length - i);
    }

    return NextResponse.json({ ok: true, sent });
  } catch (err: unknown) {
    console.error("[notify]", err);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
