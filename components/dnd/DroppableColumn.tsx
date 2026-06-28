import { useDroppable } from "@dnd-kit/core";
import Column from "../Column";

type DroppableColumnProps = {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
};

export default function DroppableColumn({
  id,
  title,
  count,
  children,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={isOver ? "ring-2 ring-blue-500/40" : ""}>
      <Column title={title} count={count}>
        {children}
      </Column>
    </div>
  );
}
