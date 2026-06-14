import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    // Treat "already exists" as success
    if (msg.toLowerCase().includes("already")) {
      return NextResponse.json({ ok: true });
    }
    console.error("[subscribe]", msg);
    return NextResponse.json({ error: "Could not subscribe. Try again later." }, { status: 500 });
  }
}
