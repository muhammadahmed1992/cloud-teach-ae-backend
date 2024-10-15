export default class ReviewsAllBookResponse {
    id: string;
    bookId: string;
    book: BookDTOResponse;
    user: {
      name: string
    };
    userId: string;
    rating: number;
    reviewText: string;
    dateOfReview: Date;
}

class BookDTOResponse {
    title: string;
    author: string;
    publicationDate: string;
    bookCover?: string | null; 
};