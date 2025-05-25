import { auth } from "@/auth";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, ShoppingCart } from "lucide-react";
import { Role } from "@/generated/prisma";
import HeaderSearchForm from "./HeaderSearchForm";

export default async function Header() {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <header className="w-full bg-background border-b border-border py-4 px-6 flex flex-row items-center justify-between gap-3 min-[570px]:gap-0">
      <Link href="/" className="text-xl font-bold">
        SuperLibrary
      </Link>

      <div className="hidden min-[580]:flex flex-1 mx-6 max-w-xl">
        <HeaderSearchForm />
      </div>

      <div className="flex items-center gap-1">
        {role === Role.MANAGER && (
          <Link href="/dashboard">
            <Button variant="secondary" className="hidden min-[580px]:flex">
              Manager
            </Button>
          </Link>
        )}
        {role === Role.ADMIN && (
          <Link href="/dashboard">
            <Button variant="secondary" className="hidden min-[580px]:flex">
              Admin
            </Button>
          </Link>
        )}

        <ThemeSwitcher />

        {!session ? (
          <Link href="/login">
            <Button variant="outline" className="min-[580]:hidden p-2">
              <LogIn className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <>
            {role === Role.USER && <Link href="/cart">
              <Button variant="ghost" className="min-[580]:hidden p-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>}
            <form action="/logout" method="POST">
              <input type="hidden" name="callbackUrl" value="/" />
              <Button type="submit" variant="outline" className="min-[580]:hidden p-2">
                <LogOut className="w-5 h-5" />
              </Button>
            </form>
          </>
        )}

        {!session ? (
          <Link href="/login">
            <Button variant="outline" className="hidden min-[580]:flex">Login</Button>
          </Link>
        ) : (
          <>
            {role === Role.USER && <Link href="/cart">
              <Button variant="ghost" className="hidden min-[580]:flex">Cart</Button>
            </Link>}
            <form action="/logout" method="POST">
              <input type="hidden" name="callbackUrl" value="/" />
              <Button type="submit" variant="outline" className="hidden min-[580]:flex">Logout</Button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
