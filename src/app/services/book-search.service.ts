import { Injectable } from '@angular/core';
import { Book } from '../common-interfaces/book.interface';
import { Observable } from 'rxjs';
import { ApiBookListResponse } from '../common-interfaces/api-response/api.book-list-response.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class BookSearchService {
    public lastSearchKey: string;
    public lastStartIndex: number;
    public errorOcurred: boolean = false;
    public loading: boolean;
    private resultBooksList: Book[];
    private resultBooksMap: Map<string, Book>;
    private numberOfBooks: number;

    public setResultBooks(response: Observable<ApiBookListResponse>): void {
        response.subscribe(() => {
            this.setNumberOfBooks(response);
            this.createResultBooksList(response);
        }, error => this.errorHandler(error))
    }

    public getResultBooksMap(): Map<string, Book> {
        return this.resultBooksMap;
    }

    public getNumberOfBooks(): number {
        return this.numberOfBooks;
    }

    public getResultBooksList(): Book[] {
        return this.resultBooksList;
    }

    private createResultBooksList(response: Observable<ApiBookListResponse>): void {
        let thumbnail = 'assets/images/nocover.jpg';
        response.pipe(
            map(
                list => (list.items as Array<Item>).map(item => {
                    if (item.volumeInfo.imageLinks != null) {
                        thumbnail = item.volumeInfo.imageLinks.thumbnail;
                    }
                    return <Book>{
                        id: item.id,
                        title: item.volumeInfo.title,
                        description: item.volumeInfo.description,
                        authors: item.volumeInfo.authors,
                        coverImageUrl: thumbnail
                    }
                })
            )).subscribe(books => {
                this.resultBooksList = books;
                this.createResultBooksMap(books);
                this.loading = false;
            })
    }

    private createResultBooksMap(books: Book[]): void {
        this.resultBooksMap = new Map;
        for (let book of books) {
            this.resultBooksMap.set(book.id, book);
        }
    }

    private setNumberOfBooks(response: Observable<ApiBookListResponse>): void {
        response.subscribe(value => {
            this.numberOfBooks = value.totalItems;
        });
    }

    private errorHandler(error) {
        this.errorOcurred = true;
        console.log('errorObject: ', error);
        throw new Error('An error occureed during the Http get call');
    }
}