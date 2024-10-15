import { Controller, Post, Get, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import ApiResponse from '@Helpers/api-response';
import { RolesGuard } from '@Guards/role.guard';
import { Roles } from '@Guards/role.decorator';
import { RoleTypes } from '@Helpers/enums/role-types.enum';
import { BooksDTO } from './dto/books.dto';

/**
 * This controller is for books and only admin can access this..
 */
@Controller('books')
@UseGuards(RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * This endpoint is for creating book. 
   * @param it will accept createBookDto which contains a BookDto body type..
   */
  @Roles(RoleTypes.Admin)
  @Post()
  async create(@Body() createBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    const book = await this.bookService.create(createBookDto);
    return book;
  }
  
  /**
   * This endpoint is for fetching all books. 
   */  
  @Roles(RoleTypes.Admin, RoleTypes.User)
  @Get()
  async findAll(): Promise<ApiResponse<BooksDTO[]>> {
    const books = await this.bookService.findAll();
    return books;
  }

  /**
   * This endpoint is for fetching specified book.
   * @param :id it will be a book id. 
   */  
  @Roles(RoleTypes.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<BookDto>> {
    const book = await this.bookService.findOne(parseInt(id, 10));
    return book;
  }

  /**
   * This endpoint is for updating specified book.
   * @param :id it will be a book id. 
   */   
  @Roles(RoleTypes.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    console.log(id);
    const updatedBook = await this.bookService.update(parseInt(id, 10), updateBookDto);
    return updatedBook;
  }

  /**
   * This endpoint is for deleting specified book.
   * @param :id it will be a book id. 
   * Also, if book is assigned to any user then it won't be deleted.
   */  
  @Roles(RoleTypes.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<BookDto | number>> {
    const deletedBook = await this.bookService.remove(parseInt(id, 10));
    return deletedBook;
  }
}