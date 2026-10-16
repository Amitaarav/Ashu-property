import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { leadSchema } from "@/lib/validators";
import { site } from "@/data/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form fields" }, { status: 422 });
  }
  const lead = parsed.data;

  // Honeypot filled in: pretend success so bots learn nothing.
  if (lead.company) return NextResponse.json({ ok: true, emailed: false });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_TO_EMAIL) {
    console.info("[lead] SMTP not configured, logging lead instead:", lead);
    return NextResponse.json({ ok: true, emailed: false });
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `New enquiry from the ${site.name} website`,
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "-"}`,
    `Requirement: ${lead.requirement}`,
    `Property type: ${lead.propertyType}`,
    `Budget: ${lead.budget || "-"}`,
    `Location: ${lead.location || "-"}`,
    `Message: ${lead.message || "-"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"${site.name} website" <${SMTP_USER}>`,
      to: LEAD_TO_EMAIL,
      replyTo: lead.email || undefined,
      subject: `New ${lead.requirement.toLowerCase()} enquiry: ${lead.name}`,
      text,
    });
    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("[lead] email failed", err);
    return NextResponse.json({ ok: false, error: "Could not send email" }, { status: 502 });
  }
}
