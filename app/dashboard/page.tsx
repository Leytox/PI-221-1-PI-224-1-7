import Link from 'next/link';
import { auth } from '@/auth'; // Adjust this import based on your auth setup
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { KeyRound, BookMarked, Library, ShoppingBag, Users, ShieldCheck } from 'lucide-react'; // Icons

// Define roles for clarity, assuming your Role enum/type is similar
enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

interface DashboardLink {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  allowedRoles: Role[];
}

const dashboardLinks: DashboardLink[] = [
  {
    href: '/manager/books',
    title: 'Manage Books',
    description: 'Add, edit, or remove books from the library catalog.',
    icon: BookMarked,
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    href: '/manager/genres',
    title: 'Manage Genres',
    description: 'Organize books by adding or editing genres.',
    icon: Library,
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    href: '/manager/orders',
    title: 'Manage Orders',
    description: 'View and update customer order statuses.',
    icon: ShoppingBag,
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    href: '/admin/users',
    title: 'Manage Users',
    description: 'View and manage user roles and access.',
    icon: Users,
    allowedRoles: [Role.ADMIN],
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const userRole = session?.user?.role as Role | undefined;

  if (!session || !userRole) {
    return (
      <main className="container mx-auto py-10 px-4 text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl text-muted-foreground mb-8">
          You must be logged in with appropriate permissions to view the dashboard.
        </p>
        <Link href="/login" className="text-lg text-blue-600 hover:underline">
          Please log in
        </Link>
      </main>
    );
  }

  const availableLinks = dashboardLinks.filter(link => 
    link.allowedRoles.includes(userRole)
  );

  if (availableLinks.length === 0) {
    return (
      <main className="container mx-auto py-10 px-4 text-center">
        <KeyRound className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">No Access</h1>
        <p className="text-xl text-muted-foreground">
          You do not have access to any management sections.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the Dashboard</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Quickly access management sections based on your role.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableLinks.map((link) => (
          <Link href={link.href} key={link.href} className="group block hover:no-underline">
            <Card className="h-full transition-all group-hover:shadow-xl group-hover:border-primary/60">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <link.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {link.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
} 