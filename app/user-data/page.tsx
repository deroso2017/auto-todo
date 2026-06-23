"use client";

import dynamic from "next/dynamic";

const UserData = dynamic(() => import("@/components/UserData"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-t-transparent border-zinc-100 rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function UserDataPage() {
  return <UserData />;
}
