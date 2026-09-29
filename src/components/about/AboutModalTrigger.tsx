"use client";

import type { ReactNode } from "react";

interface AboutModalTriggerProps {
  topic?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export default function AboutModalTrigger({
  topic = "Enterprise Architecture & Systems",
  className,
  ariaLabel,
  children,
}: AboutModalTriggerProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-about-modal", { detail: { topic } })
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
