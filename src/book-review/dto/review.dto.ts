import { IsInt, IsNotEmpty, IsString, MaxLength, Min, Max, IsDateString } from 'class-validator';

export class CreateReviewDto {
  
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reviewText: string;

  @IsInt()
  bookId: number;

  @IsDateString()
  dateOfReview: Date;
}