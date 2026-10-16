import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "ghost";
  external?: boolean;
  className?: string;
};

const styles = {
  light: "bg-white text-black hover:bg-white/85",
  dark: "bg-black text-white hover:bg-black/80",
  ghost: "border border-white/30 text-white hover:bg-white/10",
};

export default function Button({ href, children, variant = "light", external, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-normal transition-colors ${styles[variant]} ${className}`;
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
