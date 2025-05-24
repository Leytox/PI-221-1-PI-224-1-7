import { Role } from "@/generated/prisma";
import { auth } from "@/middleware";
import { redirect } from "next/navigation";
import { getAllBooks } from "@/actions/books";
import { BooksTable } from "./books-table";
import { getAllGenres } from "@/actions/genres";

export default async function BooksPage() {
  const session = await auth();
  if (!session || session.user.role === Role.USER) redirect("/");

  const books = await getAllBooks();
  const genres = await getAllGenres();

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Books Management</h1>
      </div>
      <BooksTable books={books || []} genres={genres || []} />
    </main>
  );
}
