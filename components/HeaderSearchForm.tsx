"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { findBookByTitle } from "@/actions/books";
import { toast } from "sonner";

export default function HeaderSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      const slug = await findBookByTitle(searchQuery);
      if (slug) {
        router.push(`/books/${slug}`);
        setSearchQuery(""); 
      } else {
        toast.error(`Book "${searchQuery}" not found.`);
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("An error occurred during the search.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 mx-6 max-w-xl items-center"
    >
      <Input
        type="text"
        placeholder="Search books by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-0"
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="outline"
        className="rounded-l-none border-l-0 px-3"
        disabled={isLoading}
        aria-label="Search"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
} 