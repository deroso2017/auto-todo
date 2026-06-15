import { Todo } from "@/types/todo";

export default function TodoItem({
  todo,
  onClick,
}: {
  todo: Todo;
  onClick: () => void;
}) {
  const badge =
    todo.type === "Fruit"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-orange-500/10 text-orange-400 border-orange-500/20";

  return (
    <button
      onClick={onClick}
      className="
        group w-full rounded-2xl border border-zinc-800
        bg-zinc-900 px-4 py-3 text-left
        transition-all duration-200
        hover:-translate-y-1 hover:border-zinc-700 hover:cursor-pointer
        hover:shadow-lg hover:shadow-black/40
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-100">{todo.name}</span>

        <span className={`rounded-full border px-2 py-1 text-xs ${badge}`}>
          {todo.type}
        </span>
      </div>
    </button>
  );
}
