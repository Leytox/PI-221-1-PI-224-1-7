import { BookHeart } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <BookHeart className="h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About SuperLibrary
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the story behind our passion for books.
          </p>
        </div>

        <div className="space-y-8 text-lg text-foreground/90">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">Our Mission</h2>
            <p>
              At SuperLibrary, our mission is to foster a love for reading by making a diverse collection of books accessible to everyone. We believe in the power of stories to educate, inspire, and transform lives. We are committed to providing a seamless and enjoyable experience for book lovers to discover their next great read.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">Our Collection</h2>
            <p>
              We curate a wide range of books spanning various genres, from timeless classics to contemporary bestsellers, and from insightful non-fiction to captivating fantasy. Our dedicated team works tirelessly to update our catalog, ensuring that you always have something new and exciting to explore.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">Our Community</h2>
            <p>
              SuperLibrary is more than just a place to find books; it&apos;s a community of readers, writers, and dreamers. We aim to connect people through shared literary adventures and discussions. Join us as we celebrate the written word and the incredible worlds it opens up.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">Contact Us</h2>
            <p>
              We value your feedback and are always here to help. If you have any questions, suggestions, or just want to share your thoughts about a book, please don&apos;t hesitate to reach out. You can contact us through our support channels, and we&apos;ll do our best to assist you.
            </p>
            <p className="mt-2">
              Happy Reading!
            </p>
            <p className="mt-1">
              <em>- The SuperLibrary Team</em>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 