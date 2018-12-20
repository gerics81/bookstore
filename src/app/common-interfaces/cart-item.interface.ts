import { Book } from './book.interface';

export interface CartItem {
    quantity: number;
    book: Book;
}