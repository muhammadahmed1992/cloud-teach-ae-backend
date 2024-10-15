class BookInfoDto {
    title: string;
    author: string;
    publicationDate: Date;
  }
  
  class UserInfoDto {
    name: string;
  }
  export class UserBookReviewDTO {
    id: number;
    rating: number;
    reviewText: string;
    dateOfReview: Date;
    bookId: number;
    userId: number;
    createdTime: Date;
    updatedTime: Date | null;
    isDeleted: boolean;
    book: BookInfoDto;
    user?: UserInfoDto;    
  }

 