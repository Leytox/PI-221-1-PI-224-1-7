import Link from "next/link";
import BookCard from "@/components/BookCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPopularBooks, getNewTitles } from "@/actions/books";
import { Book } from "@/generated/prisma";
import SearchBookForm from "@/components/SearchBookForm";

export default async function HomePage() {
  const popularBooksData = await getPopularBooks(4);
  const newTitlesData = await getNewTitles(4);

  const popularBooks: Book[] = popularBooksData || [];
  const newTitles: Book[] = newTitlesData || [];

  const testimonials = [
    {
      id: 1,
      quote:
        "BookHaven has transformed my reading life. I've discovered so many new authors and genres I never would have found otherwise.",
      author: "Sarah M.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtzx7EK5U_Bj84yiyg716bKo3sXT3tgeqn5aRuVvvPq2YSkaFsmY98xZeEkySwtYT1wFJ6QXaqBchZ50O_lvdljLQ8Jns5sQJqW4aM23dhO-IflYoL-VXUfqYsaDhe87ylnuSbrB0_hwtui573btCZbSLF-0m4WDL7h3MsuPuG2bQXJj0X8iwi7FZJeNnLDu3eGfF8T9QoEfm3dDem2BqAtDiGbQIev367gSzFoMnZLLgVsIbzQLBuz7nyj_4gB_E0JzrShED9zs", 
    },
  ];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Hero Section from HTML */}
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiKDlFwd2xIsiWrqHAHYsNEPWLzo1n1vwtR5jVm6tF1SKoEhOdL4HxChq2Z37-l1dUTRraWkyI9BE1r2esNhZ5j9B3iR0h91Ai2PelDU56new4wIbrB7Cs9h17iepYk5QBaBQmLNqVUnEoYRR8h03XYJKAdUV5WPh6jFTRwuYAVtbXTqeSbB1ayzfR2tsp6UtK-CtftKW5IHPzlLF7nymnMkuApLhq7Yc-qs29n0Qhnxx-3ZgyhhFQd5A4Qlt3q5uAq1qlU60v9ys')`,
              }}
            >
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Welcome to BookHaven
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Explore our vast collection of books and discover your next favorite read.
                </h2>
              </div>
              <SearchBookForm />
            </div>
          </div>
        </div>

        {/* Popular Books Section from HTML */}
        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Popular Books</h2>
        {popularBooks.length > 0 ? (
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {popularBooks.map((book) => (
                <div key={book.id} className="flex-none w-60"> 
                  <BookCard
                    slug={book.slug || ""}
                    title={book.title}
                    thumbnailUrl={book.image || ""} 
                    author={book.author} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground px-4 py-5">(No popular books to display at the moment)</p>
        )}

        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">New Releases</h2>
        {newTitles.length > 0 ? (
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {newTitles.map((book) => (
                 <div key={book.id} className="flex-none w-60"> 
                  <BookCard
                    slug={book.slug || ""}
                    title={book.title}
                    thumbnailUrl={book.image || ""}
                    author={book.author}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground px-4 py-5">(No new titles to display at the moment)</p>
        )}

        {/* Community Spotlight Section from HTML */}
        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Community Spotlight</h2>
        <div className="p-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-xl mb-4"> {/* Iterate if multiple */}
              <div className="flex flex-col gap-1 flex-[2_2_0px]">
                <p className=" text-base font-bold leading-tight">{testimonial.author}</p>
                <p className=" text-sm font-normal leading-normal">
                  {testimonial.quote}
                </p>
              </div>
              {testimonial.imageUrl && (
                <div
                  className="w-full sm:flex-1 h-48 sm:h-auto bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${testimonial.imageUrl}")` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section from HTML */}
        <div className="@container">
          <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className=" tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                Join Our Reading Community
              </h1>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex justify-center">
                <Link href="/books"> {/* Placeholder link */}
                  <Button className="h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#b2c3e5] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow">
                    Explore Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup from HTML */}
        <div className="@container">
          <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className=" tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                Stay Updated
              </h1>
              <p className=" text-base font-normal leading-normal max-w-[720px mx-auto]">Get the latest news and exclusive offers delivered to your inbox.</p>
            </div>
            <div className="flex flex-1 justify-center">
              <form className="flex flex-col min-w-40 h-14 max-w-[480px] flex-1 @[480px]:h-16">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7181] px-4 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                    required
                  />
                  <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#b2c3e5] pr-2">
                    <Button type="submit" className="flex items-center justify-center pr-2 rounded-r-xl border-l-0 border-none h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#b2c3e5] hover:bg-[#b2c3e5] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
