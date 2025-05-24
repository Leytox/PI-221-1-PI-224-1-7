// components/BookCard.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BookCardProps {
  title: string;
  thumbnailUrl: string;
}

const BookCard = ({ title, thumbnailUrl }: BookCardProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-0">
      <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      {/* Placeholder for author or other details */}
      {/* <p className="text-sm text-muted-foreground">Author Name</p> */}
    </CardContent>
    {/* Optional: CardFooter for actions like 'View Details' or 'Add to Cart' */}
    {/* <CardFooter className="p-4 pt-0">\n      <Button variant="outline" className="w-full">View Details</Button>\n    </CardFooter> */}
  </Card>
);

export default BookCard; 