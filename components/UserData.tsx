import { fetchUsers } from "@/lib/fetchUsers";
import { groupByDepartment } from "@/lib/groupByDepartment";

export default async function UserData() {
  const users = await fetchUsers();
  const groupedUsers = groupByDepartment(users);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Users by Department
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Structured view of grouped user data
          </p>
        </div>

        {/* Loading */}
        {!groupedUsers && (
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            Loading data...
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          {groupedUsers &&
            Object.entries(groupedUsers).map(([dept, value]) => (
              <div
                key={dept}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/10"
              >
                {/* Department header */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {dept}
                  </h2>

                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    dataset
                  </span>
                </div>

                {/* JSON block */}
                <div className="relative">
                  <div className="absolute right-3 top-3 text-xs text-zinc-500">
                    raw data
                  </div>

                  <pre className="overflow-auto rounded-xl border border-white/5 bg-black/30 p-4 text-xs leading-relaxed text-zinc-300">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
