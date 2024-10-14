import { Controller, Post, Get, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import ApiResponse from '@Helpers/api-response';
import { RolesGuard } from '@Guards/role.guard';
import { Roles } from '@Guards/role.decorator';
import { RoleTypes } from '@Helpers/enums/role-types.enum';

@UseGuards(RolesGuard)
@Roles(RoleTypes.Admin)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    const book = await this.bookService.create(createBookDto);
    return book;
  }

  @Get()
  async findAll(): Promise<ApiResponse<BookDto[]>> {
    const books = await this.bookService.findAll();
    return books;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<BookDto>> {
    const book = await this.bookService.findOne(parseInt(id, 10));
    return book;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: BookDto): Promise<ApiResponse<BookDto>> {
    console.log(id);
    const updatedBook = await this.bookService.update(parseInt(id, 10), updateBookDto);
    return updatedBook;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<BookDto | number>> {
    const deletedBook = await this.bookService.remove(parseInt(id, 10));
    return deletedBook;
  }
}