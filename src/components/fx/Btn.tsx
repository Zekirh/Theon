import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";
import Magnetic from "./Magnetic";

type BtnVariant = "primary" | "ghost" | "invert" | "invertGhost";
type BtnSize = "sm" | "md" | "lg";

interface BtnProps {
  children: ReactNode;
  /** Route path ("/contact") or in-page anchor ("#section-id"). */
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  full?: boolean;
  arrow?: boolean;
  disabled?: boolean;
}

const VARIANT_CLASSES: Record<BtnVariant, string> = {
  primary: "bg-solar text-carbon-ink hover:bg-bone",
  ghost:
    "border border-bone/20 bg-transparent text-bone hover:border-solar hover:text-solar",
  invert: "bg-carbon text-bone hover:bg-solar hover:text-carbon-ink",
  invertGhost:
    "border border-carbon/30 bg-transparent text-carbon-ink hover:bg-carbon hover:text-bone",
};

const DOT_CLASSES: Record<BtnVariant, string> = {
  primary: "bg-carbon",
  ghost: "bg-solar",
  invert: "bg-solar",
  invertGhost: "bg-carbon group-hover:bg-solar",
};

const SIZE_CLASSES: Record<BtnSize, string> = {
  sm: "h-10 px-5 text-[0.64rem]",
  md: "h-12 px-7 text-[0.68rem]",
  lg: "h-14 px-8 text-[0.72rem]",
};

/** Magnetic pill button — the primary interactive element of the site. */
export default function Btn({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  full = false,
  arrow = true,
  disabled = false,
}: BtnProps) {
  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-mono uppercase tracking-[0.16em] transition-colors duration-300 active:scale-[0.98]",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    full && "w-full",
    disabled && "cursor-not-allowed opacity-50 saturate-0",
    className,
  );

  const content = (
    <>
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:scale-[1.7]",
          DOT_CLASSES[variant],
        )}
      />
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.8}
        />
      )}
    </>
  );

  let element: ReactNode;
  if (to && to.startsWith("#")) {
    element = (
      <button
        type="button"
        className={classes}
        onClick={() => scrollToId(to.slice(1))}
      >
        {content}
      </button>
    );
  } else if (to) {
    element = (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  } else {
    element = (
      <button
        type={type}
        className={classes}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    );
  }

  return (
    <Magnetic className={full ? "block w-full" : "inline-block"}>
      {element}
    </Magnetic>
  );
}
