import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/data/site";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl(`Hi ${site.broker}, I found your website and would like to know more about properties.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-white px-5 text-sm font-normal text-black shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M4 4h16v12H9l-5 4V4Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
