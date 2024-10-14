import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class BookDto {  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  publicationDate: Date;

  @IsOptional()
  @IsString()
  bookCover?: string;
}