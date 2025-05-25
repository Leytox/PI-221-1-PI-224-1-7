"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { findBookByTitle } from "@/actions/books";
import { toast } from "sonner";
const MagnifyingGlassIconHero = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
    <path
      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
    ></path>
  </svg>
);

export default function SearchBookForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!searchQuery.trim()) {
      setError("Please enter a book title to search.");
      return;
    }
    setIsSearching(true);
    try {
      const slug = await findBookByTitle(searchQuery.trim()); 
      if (slug) {
        router.push(`/books/${slug}`);
      } else {
        setError("Book not found. Please try a different title.");
        toast.error("Book not found. Please try a different title.");
      }
    } catch (err) {
      setError("An error occurred during search. Please try again.");
      toast.error("An error occurred during search. Please try again.");
      console.error("Search error:", err);
    }
    setIsSearching(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full ">
        <div className=" flex border items-center justify-center pl-[15px] h-13 rounded-l-xl border-r-0">
          <MagnifyingGlassIconHero />
        </div>
        <Input
          name="search"
          placeholder="Search by book title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isSearching} // Disable input while searching
          className="form-input h-13 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-none focus:outline-0 placeholder:text-[#dddfe3] px-[15px] text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal border-t border-b focus:border-[#dddfe3] dark:text-white"
        />
        <div className="flex items-top justify-center rounded-r-xl border-l-0  pr-[7px]">
          <Button type="submit" className="h-full px-4 @[480px]:h-12 @[480px]:px-5 bg-[#b2c3e5] flex-1 text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
          {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
}