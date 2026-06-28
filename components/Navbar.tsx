"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
        >
          <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          Auto TODO
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/user-data"
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isActive("/user-data")
                ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30"
                : "text-zinc-300 hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            User Data Aggregator
          </Link>
        </div>
      </div>
    </nav>
  );
}
