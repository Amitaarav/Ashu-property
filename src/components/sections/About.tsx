"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

const pillars = ["Local market knowledge", "Verified documents", "Honest pricing", "Support from first call to registry"];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 40);
        gsap.fromTo(
          el,
          { y: speed },
          { y: -speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="overflow-hidden bg-paper px-5 py-28 text-carbon md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>About us</SectionLabel>
          <h2 className="mt-6 text-[clamp(2rem,5vw,4.25rem)] font-light leading-[1.05] tracking-tight">
            Where local knowledge builds confident decisions
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-light">
            {site.name} helps families, investors and businesses buy, sell and rent property across {site.area}, with checked
            documents, honest pricing and one person accountable from first call to registry.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact" variant="dark">Start a conversation</Button>
          </div>
        </div>

        <div className="mt-24 grid items-end gap-10 md:grid-cols-12">
          <ul className="space-y-2 text-sm text-muted-light md:col-span-3">
            {pillars.map((p, i) => (
              <li key={p} className={i === 1 ? "text-carbon" : ""}>{p}</li>
            ))}
          </ul>

          <div data-parallax="30" className="relative aspect-3/4 md:col-span-4 md:col-start-5">
            <Photo src="/residential/residential3.png" alt="Residential home exterior" sizes="(min-width: 768px) 33vw, 100vw" />
            <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.2em] text-white/85">Residential</span>
          </div>

          <div data-parallax="60" className="relative aspect-4/3 md:col-span-3 md:col-start-10">
            <Photo src="/commertial/commA.png" alt="Commercial building exterior" sizes="(min-width: 768px) 25vw, 100vw" />
            <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.2em] text-white/85">Commercial</span>
          </div>
        </div>
      </div>
    </section>
  );
}
