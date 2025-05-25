import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBookBySlug } from "@/actions/books";
import AddToCart from "@/components/AddToCart";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="md:col-span-2">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:max-w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src={book.image || "/placeholder-book.jpg"}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground">by {book.author}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{book.genre.name}</Badge>
            <Badge variant="outline">{book.type}</Badge>
            {book.language && <Badge variant="outline">{book.language}</Badge>}
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {book.isbn && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    ISBN
                  </h3>
                  <p>{book.isbn}</p>
                </div>
              )}
              {book.pages && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Pages
                  </h3>
                  <p>{book.pages}</p>
                </div>
              )}
              {book.publishedAt && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Published
                  </h3>
                  <p>
                    {new Date(book.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Price
                </h3>
                <p className="text-lg font-semibold">
                  ${book.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <AddToCart bookId={book.id} />
        </div>
      </div>
    </div>
  );
}
