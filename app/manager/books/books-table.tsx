"use client";

import React, { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookDialog } from "./book-dialog";
import { createBook, updateBook, deleteBook } from "@/actions/books";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";

type BookSortKey = "title" | "author" | "type" | "price";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: BookSortKey;
    direction: "asc" | "desc" | "none";
  }>({ key: "title", direction: "none" });

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

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = [...books]; // Create a new array for in-place sort
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(lowercasedSearchTerm) ||
        book.author.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    if (sortConfig.direction !== "none") {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === "string" && typeof valB === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        // For price, ensure numeric comparison
        if (sortConfig.key === 'price') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [books, searchTerm, sortConfig]);

  const handleSort = (key: BookSortKey) => {
    let direction: "asc" | "desc" | "none" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "none"; 
    } else {
      direction = "asc"; // Default to asc for new column or if current is none
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: BookSortKey; children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(sortKey)} className="px-2">
        {children}
        {sortConfig.key === sortKey && sortConfig.direction === "asc" && <ArrowUpDown className="ml-2 h-4 w-4" />}
        {sortConfig.key === sortKey && sortConfig.direction === "desc" && <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180" />}
        {sortConfig.key === sortKey && sortConfig.direction === "none" && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />}
        {sortConfig.key !== sortKey && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-50 transition-opacity" />}
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddBook}>Add Book</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="title">Title</SortableHeader>
              <SortableHeader sortKey="author">Author</SortableHeader>
              <SortableHeader sortKey="type">Type</SortableHeader>
              <SortableHeader sortKey="price">Price</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedBooks.map((book) => (
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
