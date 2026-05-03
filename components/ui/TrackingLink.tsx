"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

interface Props {
  href: string;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}

export function TrackingLink({ href, eventName, eventProps, className, children }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(eventName, eventProps)}
    >
      {children}
    </Link>
  );
}
