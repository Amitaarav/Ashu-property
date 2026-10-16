"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/data/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(media.current, { scale: 0.86, borderRadius: 24, ease: "none" }, 0).to(
        copy.current,
        { y: -80, opacity: 0, ease: "none" },
        0,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-100svh min-h-640px overflow-hidden bg-ink text-white">
      <div ref={media} className="absolute inset-0 origin-center overflow-hidden will-change-transform">
        <Photo src="/hero/hero.png" alt="Modern home lit at dusk" priority sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/25" />
      </div>

      <div ref={copy} className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-20">
        <p className="mb-6 text-sm text-white/70">
          {site.name} &middot; {site.area}, {site.city}
        </p>
        <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[1.02] tracking-tight pt-10">
          Homes, shops and plots worth building a life around.
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
          {site.broker} guides families, investors and business owners through every step of buying, selling and renting in {site.area}.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/#listings">Explore listings</Button>
          <Button href="/#contact" variant="ghost">Talk to {site.broker.split(" ")[0]}</Button>
        </div>
      </div>
    </section>
  );
}
