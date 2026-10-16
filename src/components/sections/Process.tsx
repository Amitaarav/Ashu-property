"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { processSteps } from "@/data/process";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${processSteps.length * 70}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setActive(Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length)));
          gsap.to(tilt.current, {
            rotateY: -25 + self.progress * 50,
            rotateX: 10 - self.progress * 14,
            rotateZ: -8 + self.progress * 16,
            duration: 0.6,
            overwrite: "auto",
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      aria-label="Our process"
      className={`relative overflow-hidden bg-ink text-white ${reduced ? "py-28" : "h-[100svh]"}`}
    >
      <div className="mx-auto flex h-full max-w-[1600px] flex-col items-center px-5 pt-24 text-center md:px-10">
        <SectionLabel>Our process</SectionLabel>

        {reduced ? (
          <ol className="mt-12 w-full max-w-2xl space-y-10 text-left">
            {processSteps.map((s, i) => (
              <li key={s.title}>
                <p className="text-3xl font-light">{pad(i)} / {s.title}</p>
                <p className="mt-2 text-white/60">{s.text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <>
            <div className="relative mt-6 w-full flex-1">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46vh] max-h-420px w-[34vh] max-w-[320px] -translate-x-1/2 -translate-y-1/2 [perspective:900px]">
                <div ref={tilt} className="relative h-full w-full overflow-hidden [transform-style:preserve-3d]">
                  <Photo
                    src="/process/process.png"
                    alt="Modern home exterior"
                    sizes="(min-width: 768px) 320px, 80vw"
                  />
                </div>
              </div>

              <ol className="absolute inset-0" aria-live="polite">
                {processSteps.map((s, i) => {
                  const offset = i - active;
                  const hidden = Math.abs(offset) > 2;
                  return (
                    <li
                      key={s.title}
                      aria-current={offset === 0 ? "step" : undefined}
                      className="absolute inset-x-0 top-1/2 text-[clamp(1.6rem,4vw,3rem)] font-light transition-all duration-500 ease-out"
                      style={{
                        transform: `translateY(calc(-50% + ${offset * 72}px))`,
                        opacity: hidden ? 0 : offset === 0 ? 1 : Math.max(0.1, 0.35 - Math.abs(offset) * 0.1),
                      }}
                    >
                      {pad(i)} / {s.title}
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mb-16 h-12 max-w-sm text-sm text-white/65">{processSteps[active].text}</p>
          </>
        )}
      </div>
    </section>
  );
}
