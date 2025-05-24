// components/BookCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface BookCardProps {
  title: string;
  thumbnailUrl: string;
  author: string;
}

const BookCard = ({ title, thumbnailUrl, author }: BookCardProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-0">
      <Image
        src={thumbnailUrl}
        alt={title}
        className="w-full h-48 object-cover"
        width={100}
        height={100}
      />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <p className="text-sm text-muted-foreground">{author}</p>
    </CardContent>
  </Card>
);

export default BookCard;
