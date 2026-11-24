"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useDepth } from "./use-depth";

// A list item or block that carries the useDepth variables, so server
// components can opt into the scroll 3D with just a class.
export function Depth({
  as: Tag = "div",
  className,
  style,
  pointer = false,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  style?: CSSProperties;
  pointer?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  useDepth(ref, { pointer });
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
