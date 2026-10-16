import Photo from "@/components/ui/Photo";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-paper text-carbon">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-2">
        <div className="relative hidden min-h-720px md:block">
          <Photo src="/contacts/contactA.png" alt="Home exterior at dusk" sizes="50vw" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 max-w-xs text-white">
            <p className="text-2xl font-light leading-snug">Tell us what you are looking for. We will do the searching.</p>
            <p className="mt-4 text-sm text-white/70">{site.phone}<br />{site.email}</p>
          </div>
        </div>

        <div className="px-5 py-24 md:px-14 md:py-32">
          <SectionLabel>Start your enquiry</SectionLabel>
          <h2 className="mb-12 mt-6 text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight">
            Let&rsquo;s find your next property
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
