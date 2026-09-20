import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#home"
      aria-label="Wesley Dulin home"
    >
      <span className="monogram">
        W<span>.</span>
      </span>
      <span className="brand-copy">
        <strong>WESLEY DULIN</strong>
        <span>SAN ANTONIO REAL ESTATE</span>
      </span>
    </a>
  );
}

export function Action({
  onClick,
  children = "Find my home",
  light = false,
  className = "",
}: {
  onClick: () => void;
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`button ${light ? "button-light" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
      <ArrowUpRight size={18} strokeWidth={1.6} />
    </button>
  );
}
