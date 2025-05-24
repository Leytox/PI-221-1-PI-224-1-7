"use client";

import { Book, BookType, Genre } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BookDialog } from "./book-dialog";
import { createBook, updateBook, deleteBook } from "@/actions/books";
import { toast } from "sonner";

export function BooksTable({
  books: initialBooks,
  genres,
}: {
  books: Book[];
  genres: Genre[];
}) {
  const [books, setBooks] = useState(initialBooks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsDialogOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
      toast.success("Book deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete book");
      }
    }
  };

  const handleSaveBook = async (bookData: {
    title: string;
    author: string;
    description: string;
    genreId: string;
    type: BookType;
    price: number;
  }) => {
    try {
      if (selectedBook) {
        const updatedBook = await updateBook(
          selectedBook.id,
          bookData.title,
          bookData.author,
          bookData.description,
          bookData.genreId,
          bookData.type,
          bookData.price
        );
        if (updatedBook) {
          setBooks(
            books.map((book) =>
              book.id === updatedBook.id ? updatedBook : book
            )
          );
          toast.success("Book updated successfully");
        }
      } else {
        const newBook = await createBook(
          bookData.title,
          bookData.author,
          bookData.description,
          bookData.genreId,
          bookData.type,
          bookData.price
        );
        if (newBook) {
          setBooks([...books, newBook]);
          toast.success("Book created successfully");
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          selectedBook ? "Failed to update book" : "Failed to create book"
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAddBook}>Add Book</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{book.type}</Badge>
                </TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBook(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <BookDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        book={selectedBook}
        onSave={handleSaveBook}
        genres={genres}
      />
    </div>
  );
}
