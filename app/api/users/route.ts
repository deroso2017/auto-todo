import { NextResponse } from "next/server";
import { fetchUsers } from "@/lib/fetchUsers";
import { groupByDepartment } from "@/lib/groupByDepartment";

export async function GET() {
  try {
    const users = await fetchUsers();
    const grouped = groupByDepartment(users);

    return NextResponse.json(grouped);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process users" },
      { status: 500 },
    );
  }
}
