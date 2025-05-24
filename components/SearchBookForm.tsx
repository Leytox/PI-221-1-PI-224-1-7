"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define MagnifyingGlassIconHero directly in this component
// or ensure it's importable from a shared location if used elsewhere.
const MagnifyingGlassIconHero = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
    <path
      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
    ></path>
  </svg>
);

export default function SearchBookForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    // TODO: Implement actual search functionality, e.g., redirect to a search results page
    console.log("Search Query:", searchQuery);
    // Example: window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full ">
        <div className=" flex border items-center justify-center pl-[15px] rounded-l-xl border-r-0">
          <MagnifyingGlassIconHero />
        </div>
        <Input
          name="search"
          placeholder="Search books, authors, genres..."
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 h-full placeholder:text-[#dddfe3] px-[15px] pr-2 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal border rounded-r-none border-r-0 rounded-l-none border-l-0 focus:border-[#dddfe3]"
        />
        <div className="flex items-center justify-center rounded-r-xl border-l-0 border pr-[7px]">
          <Button type="submit" className="h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#b2c3e5] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
} 