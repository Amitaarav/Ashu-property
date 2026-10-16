import Link from "next/link";
import Photo from "@/components/ui/Photo";
import type { Listing } from "@/data/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  const variant = listing.category === "Plot" ? "plot" : "building";
  return (
    <Link href={`/listings/${listing.slug}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-900">
        <Photo
          src={listing.image}
          alt={`${listing.title}, ${listing.locality}`}
          seed={listing.seed}
          variant={variant}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.2em] text-white/85">{listing.category}</span>
        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-normal text-black">{listing.status}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-light leading-snug">{listing.title}</h3>
          <p className="mt-1 text-sm text-white/55">
            {listing.locality}, Prayagraj &middot; {listing.area}
          </p>
        </div>
        <p className="shrink-0 text-sm font-normal">{listing.price}</p>
      </div>
    </Link>
  );
}
