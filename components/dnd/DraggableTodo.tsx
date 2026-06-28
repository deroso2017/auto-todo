import { useDraggable } from "@dnd-kit/core";
import { Todo } from "@/types/todo";
import TodoItem from "../TodoItem";

type DraggableTodoProps = {
  todo: Todo;
  mode: "select" | "drag";
  onClick: () => void;
};

export default function DraggableTodo({
  todo,
  mode,
  onClick,
}: DraggableTodoProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id,
      disabled: mode !== "drag",
    });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      {...(mode === "drag" ? listeners : {})}
      {...(mode === "drag" ? attributes : {})}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: mode === "drag" ? "grab" : "pointer",
      }}
    >
      <TodoItem todo={todo} onClick={() => {}} />
    </div>
  );
}
