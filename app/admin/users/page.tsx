import { getUsers } from "@/actions/users";

import { UsersTable } from "./users-table";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>
      <UsersTable users={users || []} />
    </main>
  );
}
