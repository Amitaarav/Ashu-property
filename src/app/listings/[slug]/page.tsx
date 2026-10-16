import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { getListing, listings } from "@/data/listings";
import { site } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";

type Params = { slug: string };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return {};
  return { title: l.title, description: `${l.type} in ${l.locality}, ${site.city}. ${l.price}. ${l.description}` };
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) notFound();

  const facts: [string, string][] = [
    ["Price", l.price],
    ["Type", l.type],
    ["Area", l.area],
    ["Locality", `${l.locality}, ${site.city}`],
    ...(l.beds ? ([["Bedrooms", String(l.beds)]] as [string, string][]) : []),
    ...(l.baths ? ([["Bathrooms", String(l.baths)]] as [string, string][]) : []),
    ...(l.facing ? ([["Facing", l.facing]] as [string, string][]) : []),
    ["Status", l.status],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.title,
    description: l.description,
    url: `${site.url}/listings/${l.slug}`,
    about: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: l.locality, addressRegion: "Uttar Pradesh", addressCountry: "IN" } },
  };

  const message = `Hi ${site.broker}, I'm interested in "${l.title}" (${l.locality}, ${l.price}). Please share more details.`;

  return (
    <article className="bg-ink pb-28 pt-24 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Link href="/listings" className="text-sm text-white/60 transition-colors hover:text-white">Back to listings</Link>

        <div className="relative mt-6 aspect-[16/9] max-h-[70vh] w-full overflow-hidden bg-neutral-900">
          <Photo src={l.image} alt={`${l.title}, ${l.locality}`} seed={l.seed} variant={l.category === "Plot" ? "plot" : "building"} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.2em] text-white/85">{l.category}</span>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-tight">{l.title}</h1>
            <p className="mt-4 text-white/60">{l.locality}, {site.city}</p>
            <p className="mt-10 max-w-2xl text-lg leading-8 text-white/75">{l.description}</p>

            <h2 className="mt-12 text-sm text-white/50">Highlights</h2>
            <ul className="mt-4 grid max-w-xl gap-3 sm:grid-cols-2">
              {l.highlights.map((h) => (
                <li key={h} className="border-b border-white/12 pb-3 text-sm">{h}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <dl className="divide-y divide-white/12 border-y border-white/12">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3 text-sm">
                    <dt className="text-white/50">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <Button href={whatsappUrl(message)} external>Enquire on WhatsApp</Button>
                <Button href={site.phoneHref} variant="ghost">Call {site.phone}</Button>
                <Button href={`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${l.title}`)}`} variant="ghost">Email us</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
