import { Role } from "@/generated/prisma";
import { auth } from "@/middleware";
import { redirect } from "next/navigation";
import { getAllGenres } from "@/actions/genres";
import { GenresTable } from "./genres-table";

export default async function GenresPage() {
  const session = await auth();
  if (!session || session.user.role === Role.USER) redirect("/");

  const genres = await getAllGenres();

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Genres Management</h1>
      </div>
      <GenresTable genres={genres || []} />
    </main>
  );
}
