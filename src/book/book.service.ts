import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@Prisma/prisma.service';
import { Book } from '@prisma/client';
import ApiResponse from '@Helpers/api-response';
import { BookDto } from './dto/book.dto';
import ResponseHelper from '@Helpers/response-helper';
import Constants from '@Helpers/constants';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    const book: Book = await this.prisma.book.create({
        data: createBookDto,
      });
      return ResponseHelper.CreateResponse<BookDto>(book, HttpStatus.CREATED, Constants.BOOK_CREATED);
  }

  async findAll(): Promise<ApiResponse<BookDto[]>> {
    const books: Book[] = await this.prisma.book.findMany({
      where: { isDeleted: false },
    });
    return ResponseHelper.CreateResponse<BookDto[]>(books, HttpStatus.OK);
  }

  async findOne(id: number): Promise<ApiResponse<BookDto | null>> {
    const book: Book | null = await this.prisma.book.findUnique({
      where: { id, isDeleted: false },
    });
    if (!book) {
        return ResponseHelper.CreateResponse<null>(null, HttpStatus.NOT_FOUND, Constants.BOOK_NOT_FOUND);
    }
    return ResponseHelper.CreateResponse<BookDto>(book, HttpStatus.FOUND);
  }

  async update(id: number, updateBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    const book = await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
    return ResponseHelper.CreateResponse<BookDto>(book, HttpStatus.OK, Constants.BOOK_UPDATED);
  }

  async remove(id: number): Promise<ApiResponse<BookDto | number>> {
        const book = await this.prisma.book.findUnique({
            where: { id }
        });
        if (!book)
            return ResponseHelper.CreateResponse<number>(id, HttpStatus.NOT_FOUND, Constants.BOOK_NOT_FOUND);
        
        const deletedBook = await this.prisma.book.update({
            where: { id },
            data: { isDeleted: true }
        });
        return ResponseHelper.CreateResponse<BookDto>(deletedBook, HttpStatus.OK, Constants.BOOK_DELETED);
    }

}