export default class Constants {
    public static readonly USER_CREATED = "User has been registered successfully!.";
    public static readonly INVALID_USER = "User name or password is incorrect.";
    public static readonly INVALID_PERMISSIONS = 'You do not have permission to access this resource';
    public static readonly MISSING_TOKEN = 'Invalid or missing token';

    public static readonly BOOK_CREATED = "Book has been created successfully!.";
    public static readonly BOOK_NOT_FOUND = "Book not found!.";
    public static readonly BOOK_DELETED = "Book has been deleted!.";
    public static readonly BOOK_UPDATED = "Book has been updated!.";
    public static readonly BOOK_ALREADY_ASSIGNED = "This book is already assigned. It can not be deleted";
    public static readonly BOOK_TITLE_ALREADY_EXISTS = "Title is already exists!. Please choose another title";

    public static readonly USER_OWN_REVIEW = 'User can only delete its own review';
    public static readonly USER_EDIT_OWN_REVIEW = 'User can only update to its book';
    public static readonly USER_REVIEW_NOT_FOUND = 'Invalid review';
}