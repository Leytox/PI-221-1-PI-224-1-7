"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Book } from '@/generated/prisma'; // Assuming Book type is available
import BookCard from '@/components/BookCard'; // Your existing BookCard
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookCarouselProps {
  books: Book[];
  options?: Parameters<typeof useEmblaCarousel>[0];
}

export function BookCarousel({ books, options }: BookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!books || books.length === 0) {
    return null; // Or some placeholder if no books
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div key={book.id} className="flex-[0_0_auto] w-60 sm:w-64 md:w-72 p-2 min-w-0">
              <BookCard
                slug={book.slug || ""} // Ensure slug is passed if BookCard expects it
                title={book.title}
                thumbnailUrl={book.image || ""}
                author={book.author}
              />
            </div>
          ))}
        </div>
      </div>
      {books.length > 1 && ( // Only show buttons if there's more than one item to scroll
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md opacity-80 hover:opacity-100 transition-opacity"
            onClick={scrollPrev}
            aria-label="Previous book"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md opacity-80 hover:opacity-100 transition-opacity"
            onClick={scrollNext}
            aria-label="Next book"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}
    </div>
  );
} 