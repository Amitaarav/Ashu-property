const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 98765 43210";
const instagramId = (process.env.NEXT_PUBLIC_INSTAGRAM_ID ?? "").replace(/^@/, "");

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "AshuM",
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE ?? "Real estate in East Prayagraj",
  broker: process.env.NEXT_PUBLIC_BROKER_NAME ?? "Ashutosh Maury",
  city: process.env.NEXT_PUBLIC_CITY ?? "Prayagraj",
  area: process.env.NEXT_PUBLIC_AREA ?? "East Prayagraj",
  phone: contactPhone,
  phoneHref: `tel:${contactPhone.replace(/[^\d+]/g, "")}`,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@yourdomain.com",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "East Prayagraj, Prayagraj, Uttar Pradesh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  social: [
    { label: "Instagram", href: instagramId ? `https://instagram.com/${instagramId}` : "https://instagram.com/" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com/" },
  ],
} as const;

export const navLinks = [
  { label: "Listings", href: "/#listings" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
] as const;
