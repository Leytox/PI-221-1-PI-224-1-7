import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react'; // Using a book icon

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <BookOpen className="w-24 h-24 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-3">
        404 - Chapter Not Found
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        It seems this page is lost in the stacks.
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg">
        The page you were searching for doesn&apos;t exist in our library. 
        Perhaps it was moved, renamed, or never written.
      </p>
      <Link href="/">
        <Button size="lg" variant="default">
          Return to the Library Entrance (Homepage)
        </Button>
      </Link>
    </div>
  );
} 