import type { Metadata } from "next";
import ListingsGrid from "@/components/sections/ListingsGrid";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Listings",
  description: "Residential, commercial and plot listings across East Prayagraj.",
};

export default function ListingsPage() {
  return (
    <section className="min-h-screen bg-ink px-5 pb-28 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel>Listings</SectionLabel>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight">
          All properties
        </h1>
        <div className="mt-14">
          <ListingsGrid />
        </div>
      </div>
    </section>
  );
}
