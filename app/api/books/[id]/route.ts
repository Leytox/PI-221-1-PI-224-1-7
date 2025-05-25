import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!book) {
      return new NextResponse("Book not found", { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("[BOOK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
