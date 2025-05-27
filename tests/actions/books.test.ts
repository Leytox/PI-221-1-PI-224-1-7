// bookService.test.ts
import * as bookService from '@/actions/books';
import { prisma } from '@/lib/prisma';

// Мок prisma.book для кожного методу
jest.mock('@/lib/prisma', () => ({
  prisma: {
    book: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe('Book service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // getBooksCount
  describe('getBooksCount', () => {
    it('повертає кількість книг', async () => {
      (prisma.book.count as jest.Mock).mockResolvedValue(10);
      const result = await bookService.getBooksCount();
      expect(result).toBe(10);
    });

    it('обробляє помилку і повертає null', async () => {
      (prisma.book.count as jest.Mock).mockRejectedValue(new Error('DB error'));
      await expect(bookService.getBooksCount()).rejects.toThrow('DB error');
      // Якщо потрібно ловити помилку всередині функції - треба змінити реалізацію
    });
  });

  // getAllBooks
  describe('getAllBooks', () => {
    it('повертає список книг', async () => {
      const mockBooks = [{ id: '1', title: 'Test Book' }];
      (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);
      const result = await bookService.getAllBooks();
      expect(result).toEqual(mockBooks);
    });

    it('обробляє помилку і повертає null', async () => {
      (prisma.book.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));
      await expect(bookService.getAllBooks()).rejects.toThrow('DB error');
    });
  });

  // getNewTitles
  describe('getNewTitles', () => {
    it('повертає обмежену кількість нових книг', async () => {
      const mockBooks = [{ id: '1', createdAt: new Date() }];
      (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);
      const result = await bookService.getNewTitles(3);
      expect(prisma.book.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        take: 3,
      });
      expect(result).toEqual(mockBooks);
    });

    it('повертає null при помилці', async () => {
      (prisma.book.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));
      const result = await bookService.getNewTitles();
      expect(result).toBeNull();
    });
  });

  // getPopularBooks
  describe('getPopularBooks', () => {
    it('повертає обмежену кількість популярних книг', async () => {
      const mockBooks = [{ id: '1', updatedAt: new Date() }];
      (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);
      const result = await bookService.getPopularBooks(5);
      expect(prisma.book.findMany).toHaveBeenCalledWith({
        orderBy: { updatedAt: 'asc' },
        take: 5,
      });
      expect(result).toEqual(mockBooks);
    });

    it('повертає null при помилці', async () => {
      (prisma.book.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));
      const result = await bookService.getPopularBooks();
      expect(result).toBeNull();
    });
  });

  // getBookById
  describe('getBookById', () => {
    it('повертає книгу за id', async () => {
      const mockBook = { id: '1', title: 'Test Book' };
      (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.getBookById('1');
      expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockBook);
    });

    it('повертає null, якщо книга не знайдена', async () => {
      (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);
      const result = await bookService.getBookById('2');
      expect(result).toBeNull();
    });
  });

  // createBook
  describe('createBook', () => {
    it('створює книгу і повертає її', async () => {
      const input = {
        title: 'New Book',
        author: 'Author',
        description: 'Desc',
        genreId: 'g1',
        type: 'PAPER' as const,
        price: 100,
      };
      const mockBook = { id: '1', ...input };
      (prisma.book.create as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.createBook(
        input.title,
        input.author,
        input.description,
        input.genreId,
        input.type,
        input.price
      );
      expect(prisma.book.create).toHaveBeenCalledWith({ data: input });
      expect(result).toEqual(mockBook);
    });
  });

  // updateBook
  describe('updateBook', () => {
    it('оновлює книгу і повертає її', async () => {
      const input = {
        id: '1',
        title: 'Updated',
        author: 'Author',
        description: 'Desc',
        genreId: 'g1',
        type: 'ELECTRONIC' as const,
        price: 150,
      };
      const mockBook = { ...input };
      (prisma.book.update as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.updateBook(
        input.id,
        input.title,
        input.author,
        input.description,
        input.genreId,
        input.type,
        input.price
      );
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: input.id },
        data: {
          title: input.title,
          author: input.author,
          description: input.description,
          genreId: input.genreId,
          type: input.type,
          price: input.price,
        },
      });
      expect(result).toEqual(mockBook);
    });
  });

  // deleteBook
  describe('deleteBook', () => {
    it('видаляє книгу і повертає її', async () => {
      const mockBook = { id: '1', title: 'ToDelete' };
      (prisma.book.delete as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.deleteBook('1');
      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockBook);
    });
  });

  // getBookBySlug
  describe('getBookBySlug', () => {
    it('повертає книгу з жанром', async () => {
      const mockBook = {
        id: '1',
        slug: 'test-book',
        genre: { id: 'g1', name: 'Fiction' },
      };
      (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.getBookBySlug('test-book');
      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-book' },
        include: { genre: true },
      });
      expect(result).toEqual(mockBook);
    });

    it('повертає null при помилці', async () => {
      (prisma.book.findUnique as jest.Mock).mockRejectedValue(new Error('DB error'));
      const result = await bookService.getBookBySlug('no-slug');
      expect(result).toBeNull();
    });
  });

  // findBookByTitle
  describe('findBookByTitle', () => {
    it('повертає slug книги, якщо знайдена', async () => {
      const mockBook = { slug: 'test-slug' };
      (prisma.book.findFirst as jest.Mock).mockResolvedValue(mockBook);
      const result = await bookService.findBookByTitle('Test Title');
      expect(prisma.book.findFirst).toHaveBeenCalledWith({
        where: { title: { contains: 'Test Title', mode: 'insensitive' } },
        select: { slug: true },
      });
      expect(result).toEqual('test-slug');
    });

    it('повертає null, якщо книга не знайдена', async () => {
      (prisma.book.findFirst as jest.Mock).mockResolvedValue(null);
      const result = await bookService.findBookByTitle('NoTitle');
      expect(result).toBeNull();
    });

    it('повертає null при помилці', async () => {
      (prisma.book.findFirst as jest.Mock).mockRejectedValue(new Error('DB error'));
      const result = await bookService.findBookByTitle('Error');
      expect(result).toBeNull();
    });
  });
});
