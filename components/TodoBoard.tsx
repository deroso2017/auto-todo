"use client";

import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import { todosMock } from "@/mock/todos";
import Column from "./Column";

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>(todosMock);
  const timers = useRef<Record<number, NodeJS.Timeout>>({});

  const moveToCategory = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "active" } : t)),
    );

    timers.current[id] = setTimeout(() => {
      returnToMain(id);
    }, 5000);
  };

  const returnToMain = (id: number) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "main" } : t)),
    );
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, []);

  const main = todos.filter((t) => t.status === "main");
  const fruit = todos.filter(
    (t) => t.status === "active" && t.type === "Fruit",
  );
  const vegetable = todos.filter(
    (t) => t.status === "active" && t.type === "Vegetable",
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Column title="Main List" count={main.length}>
        {main.map((t) => (
          <TodoItem key={t.id} todo={t} onClick={() => moveToCategory(t.id)} />
        ))}
      </Column>

      <Column title="Fruit" count={fruit.length}>
        {fruit.map((t) => (
          <TodoItem key={t.id} todo={t} onClick={() => returnToMain(t.id)} />
        ))}
      </Column>

      <Column title="Vegetable" count={vegetable.length}>
        {vegetable.map((t) => (
          <TodoItem key={t.id} todo={t} onClick={() => returnToMain(t.id)} />
        ))}
      </Column>
    </div>
  );
}
