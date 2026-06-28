export async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error(`Failed to fetch users ${res.status}`);
  }

  const data = await res.json();
  return data.users;
}
