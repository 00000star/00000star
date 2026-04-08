"use client";

import { useMemo } from "react";
import katex from "katex";

interface LatexProps {
  math: string;
  display?: boolean;
  className?: string;
}

export function Latex({ math, display = false, className = "" }: LatexProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
