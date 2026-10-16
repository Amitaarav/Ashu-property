"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ListingCard from "@/components/ui/ListingCard";
import { listings, categories, type Category } from "@/data/listings";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

export default function ListingsGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo(() => {
    const filtered = filter === "All" ? listings : listings.filter((l) => l.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  return (
    <div>
      <div role="tablist" aria-label="Filter listings by property type" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              filter === f ? "border-white bg-white text-black" : "border-white/25 text-white/75 hover:border-white/60"
            }`}
          >
            {f === "Plot" ? "Plots" : f}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-16 text-white/60">No listings in this category yet. Message us and we will look for you.</p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      )}

      {limit && (
        <div className="mt-16 flex justify-center">
          <Link href="/listings" className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-white/85">
            View all listings
          </Link>
        </div>
      )}
    </div>
  );
}
