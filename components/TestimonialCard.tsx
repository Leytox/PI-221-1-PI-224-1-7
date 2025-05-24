// components/TestimonialCard.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard = ({ quote, author }: TestimonialCardProps) => (
  <Card>
    <CardContent className="p-6">
      <blockquote className="italic text-lg">
        <p>\"{quote}\"</p>
      </blockquote>
      <p className="text-right mt-4 font-semibold text-sm text-muted-foreground">- {author}</p>
    </CardContent>
  </Card>
);

export default TestimonialCard; 