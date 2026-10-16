import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import { team } from "@/data/team";

export default function Team() {
  return (
    <section id="team" className="bg-paper px-5 py-28 text-carbon md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel>Team</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4.25rem)] font-light leading-[1.05] tracking-tight">
          The people behind every deal
        </h2>

        <ul className="mt-16 border-t border-black/15">
          {team.map((m, i) => (
            <li key={m.name} className="grid items-center gap-4 border-b border-black/15 py-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h3 className="text-xl font-light">{m.name}</h3>
                <p className="mt-1 max-w-md text-sm text-muted-light">{m.text}</p>
              </div>
              <div className="relative h-16 w-16 overflow-hidden md:col-span-2 md:col-start-7">
                <Photo src={m.image} alt={m.name} seed={i + 1} variant="portrait" sizes="64px" />
              </div>
              <p className="text-sm text-muted-light md:col-span-4 md:col-start-9 md:text-right">{m.tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
