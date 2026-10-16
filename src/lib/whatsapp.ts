import { site } from "@/data/site";
import type { LeadInput } from "@/lib/validators";

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function leadToWhatsApp(lead: LeadInput) {
  const lines = [
    `Hi ${site.broker}, I'm ${lead.name}.`,
    `I want to ${lead.requirement.toLowerCase()} a ${lead.propertyType.toLowerCase()} property.`,
    lead.location ? `Preferred location: ${lead.location}` : "",
    lead.budget ? `Budget: ${lead.budget}` : "",
    lead.message ? `Note: ${lead.message}` : "",
    `Phone: ${lead.phone}`,
  ].filter(Boolean);
  return whatsappUrl(lines.join("\n"));
}
