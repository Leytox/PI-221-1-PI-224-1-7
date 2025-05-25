import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import GoTop from "@/components/GoTop";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: "--font-plus-jakarta-sans",
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Super Library",
  description: "Super Library - Your one-stop shop for all your book needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${notoSans.variable} font-sans antialiased group/design-root overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-plus-jakarta-sans), var(--font-noto-sans), sans-serif' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <GoTop />
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
