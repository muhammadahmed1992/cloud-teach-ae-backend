import { Controller, Post, Body, Get, Param, Delete, Query, Request, UseGuards, Put } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { RolesGuard } from '@Guards/role.guard';
import { Roles } from '@Guards/role.decorator';
import { RoleTypes } from '@Helpers/enums/role-types.enum';
import ApiResponse from '@Helpers/api-response';

@Controller('reviews')
@UseGuards(RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async create(@Request() req, @Body() createReviewDto: CreateReviewDto): Promise<ApiResponse<CreateReviewDto>> {
    const userId = req.user.id;
    return this.reviewsService.createReview(userId, createReviewDto);
  }

  @Put(':id')
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
  ): Promise<ApiResponse<CreateReviewDto | number>> {
    const userId = req.user.id;
    return this.reviewsService.updateReview(userId, id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async delete(@Request() req, @Param('id') id: string): Promise<ApiResponse<CreateReviewDto | number>> {
    const userId = req.user.id;
    return this.reviewsService.deleteReview(userId, id);
  }

  @Get('search')
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async search(@Query('term') term: string) {
    return this.reviewsService.searchReviews(term);
  }
  
  @Get('/user/books')
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async getReviews(@Request() req) {
    // TODO: This can be enhanced further by adding base controller or maybe a decorator to get userId.
    const userId = req.user.id;
    return this.reviewsService.getReviewsByUserId(userId);
  }

  @Get(':bookId/book')
  @Roles(RoleTypes.Admin, RoleTypes.User)
  async getReviewsForBook(@Param('bookId') bookId: string) {
    const reviews = await this.reviewsService.getReviewsForByBookId(bookId);
    return reviews;
  }
}
