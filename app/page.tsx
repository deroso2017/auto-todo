import TodoBoard from "@/components/TodoBoard";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-center text-4xl font-bold">
          Auto Delete Todo List
        </h1>

        <p className="mt-2 text-center text-sm text-zinc-400">
          Click or drag item → moves to category → returns after 5s
        </p>

        <div className="mt-10">
          <TodoBoard />
        </div>
      </div>
    </main>
  );
}
