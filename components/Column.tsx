import { ColumnProps } from "@/types/column";

export default function Column({ title, count, children }: ColumnProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur h-full z-10">
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
          {count}
        </span>
      </div>

      {/* content */}
      <div className="flex min-h-[520px] flex-col gap-3">{children}</div>
    </div>
  );
}
