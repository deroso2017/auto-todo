import { Todo } from "@/types/todo";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";

type TodoItemProps = {
  todo: Todo;
  onClick?: () => void;
  dragProps?: {
    ref: (node: HTMLElement | null) => void;
    listeners: DraggableSyntheticListeners;
    attributes: DraggableAttributes;
    style?: React.CSSProperties;
    isDragging?: boolean;
  };
};

export default function TodoItem({ todo, onClick, dragProps }: TodoItemProps) {
  const badge =
    todo.type === "Fruit"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-orange-500/10 text-orange-400 border-orange-500/20";

  return (
    <button
      ref={dragProps?.ref}
      onClick={onClick}
      {...dragProps?.listeners}
      {...dragProps?.attributes}
      style={{
        ...dragProps?.style,
        opacity: dragProps?.isDragging ? 0.5 : 1,
      }}
      className="
        group w-full rounded-2xl border border-zinc-800
        bg-zinc-900 px-4 py-3 text-left
        transition-all duration-200
        hover:-translate-y-1 hover:border-zinc-700 hover:cursor-grab
        active:cursor-grabbing
        hover:shadow-lg hover:shadow-black/40
        z-20
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
