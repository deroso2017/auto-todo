"use client";

import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import { todosMock } from "@/mock/todos";
import toast from "react-hot-toast";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DraggableTodo from "./dnd/DraggableTodo";
import DroppableColumn from "./dnd/DroppableColumn";

type Mode = "select" | "drag";

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>(todosMock);
  const [mode, setMode] = useState<Mode>("select");
  const [activeId, setActiveId] = useState<number | null>(null);

  const timers = useRef<Record<number, NodeJS.Timeout>>({});

  const sensors = useSensors(useSensor(PointerSensor));

  // CORE LOGIC
  const returnToMain = (id: number) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "main" } : t)),
    );
  };

  const moveToCategory = (id: number, type: "Fruit" | "Vegetable") => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    if (todo.type !== type) {
      toast.error("Wrong column for this item");
      return;
    }

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "active", type } : t)),
    );

    timers.current[id] = setTimeout(() => {
      returnToMain(id);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, []);

  // CLICK (ONLY IN SELECT MODE)
  const handleClick = (todo: Todo) => {
    if (mode !== "select") return;
    if (todo.status !== "main") return;

    moveToCategory(todo.id, todo.type);
  };

  // DND
  const onDragStart = (event: DragStartEvent) => {
    if (mode !== "drag") return;
    setActiveId(Number(event.active.id));
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (mode !== "drag") return;

    setActiveId(null);

    const { active, over } = event;
    if (!over) return;

    const id = Number(active.id);
    const overId = over.id as "fruit" | "vegetable";

    if (overId === "fruit") moveToCategory(id, "Fruit");
    if (overId === "vegetable") moveToCategory(id, "Vegetable");
  };

  // DATA
  const main = todos.filter((t) => t.status === "main");
  const fruit = todos.filter(
    (t) => t.status === "active" && t.type === "Fruit",
  );
  const vegetable = todos.filter(
    (t) => t.status === "active" && t.type === "Vegetable",
  );

  const activeTodo = todos.find((t) => t.id === activeId);

  return (
    <div className="space-y-4">
      {/* MODE TOGGLE */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode("select")}
          className={`px-3 py-1 rounded-lg border text-sm transition cursor-pointer hover:opacity-80 ${
            mode === "select"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              : "border-zinc-800 text-zinc-400"
          }`}
        >
          Select mode
        </button>

        <button
          onClick={() => setMode("drag")}
          className={`px-3 py-1 rounded-lg border text-sm transition cursor-pointer hover:opacity-80 ${
            mode === "drag"
              ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
              : "border-zinc-800 text-zinc-400"
          }`}
        >
          Drag mode
        </button>
      </div>

      {/* BOARD */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DroppableColumn id="main" title="Main List" count={main.length}>
            {main.map((t) => (
              <DraggableTodo
                key={t.id}
                todo={t}
                mode={mode}
                onClick={() => handleClick(t)}
              />
            ))}
          </DroppableColumn>

          <DroppableColumn id="fruit" title="Fruit" count={fruit.length}>
            {fruit.map((t) => (
              <TodoItem key={t.id} todo={t} />
            ))}
          </DroppableColumn>

          <DroppableColumn
            id="vegetable"
            title="Vegetable"
            count={vegetable.length}
          >
            {vegetable.map((t) => (
              <TodoItem key={t.id} todo={t} />
            ))}
          </DroppableColumn>
        </div>

        {/* Drag preview */}
        <DragOverlay>
          {activeTodo ? (
            <div className="scale-105 opacity-90">
              <TodoItem todo={activeTodo} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
