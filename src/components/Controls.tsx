import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

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
