# AshuM Real Estate (Next.js 15 + TypeScript)

Broker portfolio for Ashutosh Maury, East Prayagraj. UI modelled on the Northwall template
(black / light-grey alternating sections, pinned scroll process, minimal nav, underline form).

## Run
```bash
npm install
cp .env.example .env.local   # fill SMTP values to receive lead emails
npm run dev                  # http://localhost:3000
```

## Replace placeholder content
| What | Where |
|---|---|
| Brand, phone, WhatsApp, email, address, social links | `.env` (`NEXT_PUBLIC_*` variables), read by `src/data/site.ts` |
| Listings (sample data) | `src/data/listings.ts` (add `image: "/listings/x.jpg"` to use a real photo) |
| Team names / photos | `src/data/team.ts` |
| Process steps | `src/data/process.ts` |
| Colors | `@theme` block in `src/app/globals.css` |

Any item without an `image` shows a generated architectural placeholder, so nothing looks empty.
Put real photos in `public/` and reference them as `/name.jpg`.

`NEXT_PUBLIC_*` settings are included in the browser bundle, so use them only for public business details. Keep SMTP credentials and other secrets in server-only variables without the `NEXT_PUBLIC_` prefix.

## Leads
`ContactForm` -> `POST /api/lead` -> email via SMTP (nodemailer). After sending, the visitor
gets a "Continue on WhatsApp" button with their details pre-filled. Without SMTP env vars the
lead is logged to the server console only.

## Structure
```
src/app            routes (/, /listings, /listings/[slug], /api/lead)
src/components     layout/, sections/, ui/
src/data           typed content
src/lib            gsap setup, zod schema, whatsapp helper
```
