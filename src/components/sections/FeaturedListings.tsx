import SectionLabel from "@/components/ui/SectionLabel";
import ListingsGrid from "@/components/sections/ListingsGrid";

export default function FeaturedListings() {
  return (
    <section id="listings" className="bg-ink px-5 py-28 text-white md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel>Listings</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4.25rem)] font-light leading-[1.05] tracking-tight">
          Properties across East Prayagraj
        </h2>
        <div className="mt-14">
          <ListingsGrid limit={6} />
        </div>
      </div>
    </section>
  );
}
