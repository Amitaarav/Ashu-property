import Link from "next/link";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-24 text-white md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[clamp(3rem,12vw,11rem)] font-light leading-none tracking-tight">{site.name}</p>
        <div className="mt-16 grid gap-12 border-t border-white/12 pt-10 text-sm md:grid-cols-4">
          <div>
            <p className="text-white/50">Contact</p>
            <p className="mt-3 leading-7">
              <a href={site.phoneHref} className="hover:underline">{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
            </p>
          </div>
          <div>
            <p className="text-white/50">Office</p>
            <p className="mt-3 leading-7">{site.address}</p>
          </div>
          <div>
            <p className="text-white/50">Explore</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/50">Follow</p>
            <ul className="mt-3 space-y-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-16 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {site.name}. {site.broker}, {site.city}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
