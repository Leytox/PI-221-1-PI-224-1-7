import Link from "next/link";
import BookCard from "@/components/BookCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPopularBooks, getNewTitles } from "@/actions/books";
import { Book } from "@/generated/prisma";

export default async function HomePage() {
  // Fetch dynamic data
  const popularBooksData = await getPopularBooks(3);
  const newTitlesData = await getNewTitles(3);

  // Use fetched data or provide empty arrays as fallbacks
  const popularBooks: Book[] = popularBooksData || [];
  const newTitles: Book[] = newTitlesData || [];

  const testimonials = [
    {
      id: 1,
      quote:
        "This library has an amazing collection and a wonderful atmosphere! Truly a gem in our community.",
      author: "Jane D., Avid Reader",
    },
    {
      id: 2,
      quote:
        "The staff picks are always spot on. I've discovered so many great authors thanks to their recommendations.",
      author: "John S., Local Resident",
    },
    {
      id: 3,
      quote:
        "A fantastic place to study and find inspiration. The quiet zones are perfect for deep work.",
      author: "Alex P., Student",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section
        className="relative bg-cover bg-center py-40 px-4 text-center text-primary-foreground"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white ">
            Welcome to Our Library
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white">
            Discover your next favorite book. Search our vast collection of
            books, authors, and genres.
          </p>
          <div className="max-w-xl mx-auto flex gap-2">
            <Input
              type="search"
              placeholder="Search for books, authors, genres..."
              className="text-lg p-6 bg-background/90 placeholder:text-muted-foreground focus-visible:ring-primary text-white"
            />
            <Button type="submit" size="lg" className="text-lg p-6">
              Search
            </Button>
          </div>
        </div>
      </section>
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-16">
        {/* Popular Books Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
            Popular Books
          </h2>
          {popularBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {popularBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  thumbnailUrl={book.image || ""}
                  author={book.author}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              (No popular books to display at the moment)
            </p>
          )}
        </section>

        {/* New Titles Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
            Fresh Off The Press
          </h2>
          {newTitles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {newTitles.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  thumbnailUrl={book.image || ""}
                  author={book.author}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              (No new titles to display at the moment)
            </p>
          )}
        </section>

        {/* Testimonials / Community Spotlights Section */}
        <section className="mb-20 bg-muted/50 p-10 rounded-xl">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
            From Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-20 py-12 bg-primary/10 rounded-xl">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Ready to Dive In?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our vast collection or join our community events. Your next
            adventure awaits!
          </p>
          <Link href="/browse-books">
            <Button size="lg" className="text-lg p-7">
              Browse All Books
            </Button>
          </Link>
        </section>

        {/* Newsletter Signup Section */}
        <section className="bg-secondary/30 p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-3 text-center tracking-tight">
            Stay Updated!
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest updates, curated reading
            lists, and exclusive event invitations.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="text-base p-5 bg-background placeholder:text-muted-foreground focus-visible:ring-primary"
              required
            />
            <Button type="submit" size="lg" className="text-base p-5">
              Subscribe
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
