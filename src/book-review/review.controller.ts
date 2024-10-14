import { Controller, Post, Body, Get, Param, Delete, Query, Request, UseGuards, Put } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { RolesGuard } from '@Guards/role.guard';
import { Roles } from '@Guards/role.decorator';
import { RoleTypes } from '@Helpers/enums/role-types.enum';
import ApiResponse from '@Helpers/api-response';

@Controller('reviews')
@UseGuards(RolesGuard)
@Roles(RoleTypes.Admin, RoleTypes.User)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Request() req, @Body() createReviewDto: CreateReviewDto): Promise<ApiResponse<CreateReviewDto>> {
    const userId = req.user.id;
    return this.reviewsService.createReview(userId, createReviewDto);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
  ): Promise<ApiResponse<CreateReviewDto | number>> {
    const userId = req.user.id;
    return this.reviewsService.updateReview(userId, id, updateReviewDto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string): Promise<ApiResponse<CreateReviewDto | number>> {
    const userId = req.user.id;
    return this.reviewsService.deleteReview(userId, id);
  }

  @Get('search')
  async search(@Query('term') term: string) {
    return this.reviewsService.searchReviews(term);
  }
  
  @Get(':bookId')
  async getReviews(@Request() req, @Param('bookId') bookId: string) {
    // TODO: This can be enhanced further by adding base controller or maybe a decorator to get userId.
    const userId = req.user.id;
    return this.reviewsService.getReviewsByBookId(userId, bookId);
  }

  @Get(':bookId/book')
  async getReviewsForBook(@Param('bookId') bookId: string) {
    const reviews = await this.reviewsService.getReviewsForBook(parseInt(bookId, 10));
    return reviews;
  }
}
