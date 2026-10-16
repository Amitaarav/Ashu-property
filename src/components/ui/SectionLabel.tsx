export default function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`text-[11px] uppercase tracking-[0.22em] opacity-60 ${className}`}>{children}</p>;
}
