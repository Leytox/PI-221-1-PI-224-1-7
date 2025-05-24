import { getAllBooks } from "@/actions/books";
import { getAllGenres } from "@/actions/genres";
import BooksClient from "../../components/BooksClient";

export default async function BooksPage() {
  const [books, genres] = await Promise.all([getAllBooks(), getAllGenres()]);

  return (
    <BooksClient initialBooks={books || []} initialGenres={genres || []} />
  );
}
