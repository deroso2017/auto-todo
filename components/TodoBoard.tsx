"use client";

import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { Mode, TimerState, Todo } from "@/types/todo";
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
import { FaPause, FaPlay } from "react-icons/fa";

import DraggableTodo from "./dnd/DraggableTodo";
import DroppableColumn from "./dnd/DroppableColumn";

const DEFAULT_DELETE_TIME = 5;

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>(todosMock);
  const [mode, setMode] = useState<Mode>("select");
  const [activeId, setActiveId] = useState<number | null>(null);

  const [autoDeleteTime, setAutoDeleteTime] = useState(DEFAULT_DELETE_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const [hasActiveTimers, setHasActiveTimers] = useState(false);

  const timers = useRef<Record<number, TimerState>>({});

  const sensors = useSensors(useSensor(PointerSensor));

  // TIMER CORE
  const returnToMain = (id: number) => {
    const timer = timers.current[id];
    if (timer?.timeoutId) clearTimeout(timer.timeoutId);
    delete timers.current[id];

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "main" } : t)),
    );

    // check if any timers still exist
    const stillActive = Object.keys(timers.current).length > 0;
    setHasActiveTimers(stillActive);
  };

  const getNow = () => +new Date();

  const startTimer = (id: number, duration: number) => {
    const startTime = getNow();
    setHasActiveTimers(true);

    const timeoutId = setTimeout(() => {
      returnToMain(id);
    }, duration);

    timers.current[id] = {
      timeoutId,
      startTime,
      remaining: duration,
      paused: false,
    };
  };

  const pauseTimers = () => {
    setIsPaused(true);

    Object.values(timers.current).forEach((timer) => {
      if (timer.paused) return;

      if (timer.timeoutId) clearTimeout(timer.timeoutId);

      const elapsed = Date.now() - (timer.startTime ?? Date.now());
      timer.remaining = Math.max(timer.remaining - elapsed, 0);
      timer.paused = true;
    });
  };

  const resumeTimers = () => {
    setIsPaused(false);

    Object.entries(timers.current).forEach(([id, timer]) => {
      if (!timer.paused) return;

      const numericId = Number(id);

      const timeoutId = setTimeout(() => {
        returnToMain(numericId);
      }, timer.remaining);

      timers.current[numericId] = {
        ...timer,
        timeoutId,
        startTime: Date.now(),
        paused: false,
      };
    });
  };

  const togglePause = () => {
    if (isPaused) resumeTimers();
    else pauseTimers();
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => {
        if (t.timeoutId) clearTimeout(t.timeoutId);
      });
    };
  }, []);

  // LOGIC
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

    startTimer(id, autoDeleteTime * 1000);
  };

  const handleClick = (todo: Todo) => {
    if (mode !== "select") return;
    if (todo.status !== "main") return;

    if (isPaused) resumeTimers();

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

    // auto-resume after drop if paused
    if (isPaused) {
      resumeTimers();
    }
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
      {/* CONTROLS */}
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode("select")}
            className={`px-3 py-1 rounded-lg border text-sm cursor-pointer hover:opacity-80 ${
              mode === "select"
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                : "border-zinc-800 text-zinc-400"
            }`}
          >
            Select mode
          </button>

          <button
            onClick={() => setMode("drag")}
            className={`px-3 py-1 rounded-lg border text-sm cursor-pointer hover:opacity-80 ${
              mode === "drag"
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "border-zinc-800 text-zinc-400"
            }`}
          >
            Drag mode
          </button>
        </div>

        <div className="flex items-end gap-3">
          {hasActiveTimers && (
            <button
              onClick={togglePause}
              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition hover:opacity-80 cursor-pointer"
            >
              {isPaused ? (
                <>
                  <FaPlay className="text-green-400" />
                  Continue
                </>
              ) : (
                <>
                  <FaPause className="text-yellow-400" />
                  Pause
                </>
              )}
            </button>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-400">
              Auto-delete time (seconds)
            </label>

            <input
              type="number"
              value={autoDeleteTime}
              min={1}
              step={1}
              onChange={(e) => setAutoDeleteTime(Number(e.target.value))}
              className="px-2 py-1 border rounded-lg text-sm w-20 border-zinc-800
             disabled:opacity-50
             disabled:cursor-not-allowed
             disabled:bg-zinc-900
             disabled:border-zinc-700"
              disabled={hasActiveTimers}
            />
          </div>
        </div>
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

        {/* DRAG PREVIEW */}
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
