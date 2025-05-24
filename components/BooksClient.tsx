"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Genre } from "@/generated/prisma";

const bookTypes = ["All", "PAPER", "ELECTRONIC", "AUDIO"];

interface BooksClientProps {
  initialBooks: Book[];
  initialGenres: Genre[];
}

export default function BooksClient({
  initialBooks,
  initialGenres,
}: BooksClientProps) {
  const [books] = useState<Book[]>(initialBooks);
  const [genres] = useState<Genre[]>(initialGenres);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    let filtered = [...books];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    // Apply genre filter
    if (selectedGenre !== "All") {
      filtered = filtered.filter((book) => book.genreId === selectedGenre);
    }

    // Apply type filter
    if (selectedType !== "All") {
      filtered = filtered.filter((book) => book.type === selectedType);
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedGenre, selectedType]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Collection</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 space-y-6">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  type="search"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Book Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bookTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Results count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredBooks.length} books
          </p>

          {/* Books grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  slug={book.slug || ""}
                  key={book.id}
                  title={book.title}
                  thumbnailUrl={book.image || ""}
                  author={book.author}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No books found matching your criteria
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
