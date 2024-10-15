import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@Prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';
import ApiResponse from '@Helpers/api-response';
import ResponseHelper from '@Helpers/response-helper';
import Constants from '@Helpers/constants';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: string, createReviewDto: CreateReviewDto): Promise<ApiResponse<CreateReviewDto>> {
    const uId = parseInt(userId, 10);

    const review = await this.prisma.bookReview.create({
        data: {
            userId: uId,
            bookId: createReviewDto.bookId,
            rating: createReviewDto.rating,
            reviewText: createReviewDto.reviewText,
            dateOfReview: createReviewDto.dateOfReview
          },
    });
    return ResponseHelper.CreateResponse<CreateReviewDto>(review, HttpStatus.CREATED);
  }

  async getReviewsByBookId(userId: string, bookId: string): Promise<ApiResponse<any>> {
    const uId = parseInt(userId, 10);
    const bId = parseInt(bookId, 10);
    const response = await this.prisma.bookReview.findMany({
      where: { bookId: bId, userId: uId }
    });
    return ResponseHelper.CreateResponse<any>(response, HttpStatus.OK);
  }

  async updateReview(userId: number, reviewId: string, updateReviewDto: CreateReviewDto): Promise<ApiResponse<CreateReviewDto | number>> {
    const rId = parseInt(reviewId, 10);
    const review = await this.prisma.bookReview.findUnique({
      where: { id: rId },
    });

    if (review.userId !== userId)
        return ResponseHelper.CreateResponse<number>(rId, HttpStatus.FORBIDDEN, Constants.USER_EDIT_OWN_REVIEW);

    if (!review)
         return ResponseHelper.CreateResponse<number>(rId, HttpStatus.NOT_FOUND, Constants.INVALID_USER);
    
    const response =  await this.prisma.bookReview.update({
      where: { id: rId },
      data: updateReviewDto,
    });
    return ResponseHelper.CreateResponse<CreateReviewDto>(response, HttpStatus.OK);
  }

  async deleteReview(userId: string, reviewId: string): Promise<ApiResponse<CreateReviewDto | number>> {
    const uId = parseInt(userId, 10);
    const rId = parseInt(reviewId, 10);
    const review = await this.prisma.bookReview.findUnique({
      where: { id: rId },
    });

    if (!review)
        return ResponseHelper.CreateResponse<number>(rId, HttpStatus.NOT_FOUND);

    // TODO: This can be further refactored and can be placed inside separate decorator to validate this thing.
    if (review.userId !== uId)
            return ResponseHelper.CreateResponse<number>(rId, HttpStatus.FORBIDDEN, Constants.USER_OWN_REVIEW);
    
    const result = await this.prisma.bookReview.delete({
      where: { id: rId },
    });
    return ResponseHelper.CreateResponse<CreateReviewDto>(result, HttpStatus.OK);
  }

  async searchReviews(searchTerm: string): Promise<ApiResponse<CreateReviewDto[]>> {
    const isNumeric = !isNaN(+searchTerm);
    
    const response = await this.prisma.bookReview.findMany({
      where: {
        OR: [
          {
            book: {
              title: { contains: searchTerm },
            },
          },
          {
            book: {
              author: { contains: searchTerm },
            },
          },
          isNumeric
            ? { rating: { gte: +searchTerm } }
            : {},
        ],
      },
      include: {
        book: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!response?.length) {
      return ResponseHelper.CreateResponse<null>(null, HttpStatus.NOT_FOUND);
    }
  
    return ResponseHelper.CreateResponse<CreateReviewDto[]>(response, HttpStatus.OK);
  }

  async getReviewsForBook(bookId: number): Promise<ApiResponse<any>> {
    const result = await this.prisma.bookReview.findMany({
      where: { bookId, isDeleted: false },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        book: {
          select: {
            title: true, 
            author: true, 
            publicationDate: true
          }
        }
      },
    });
    return ResponseHelper.CreateResponse<any>(result, HttpStatus.OK, 'Book review retrieved successfully');
  }
}
