// components/BookCard.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface BookCardProps {
  slug: string;
  title: string;
  thumbnailUrl: string;
  author?: string; // Make author optional for now
}

const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/300x400/E0E0E0/BDBDBD?text=No+Image";

const BookCard = ({ title, thumbnailUrl, author, slug }: BookCardProps) => (
  <Card className="overflow-hidden flex flex-col h-full pt-0 "> {/* Added flex flex-col h-full for consistent card height if needed */}
    <CardHeader className="p-0">
      <Link href={`/books/${slug}`} className='relative h-[300px]' >
      <Image
        fill
        src={thumbnailUrl || PLACEHOLDER_IMAGE_URL}
        alt={title}
        className="w-full aspect-[3/4] object-cover" // aspect-[3/4] as in HTML
      />
      </Link>
    </CardHeader>
    <CardContent className="p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
      <CardTitle className="text-base font-medium leading-normal mb-1">{title}</CardTitle> {/* Match HTML styling */}
      {author && (
        <p className="text-sm text-muted-foreground leading-normal">{author}</p> // Match HTML styling for description/author
      )}
    </CardContent>
    {/* Optional: CardFooter for actions like 'View Details' or 'Add to Cart'
    <CardFooter className="p-4 pt-0 mt-auto"> 
      <Button variant="outline" className="w-full">View Details</Button>
    </CardFooter>
    */}
  </Card>
);

export default BookCard;
