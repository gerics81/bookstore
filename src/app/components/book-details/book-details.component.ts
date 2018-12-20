import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common-interfaces/book.interface';
import { BookSearchService } from 'src/app/services/book-search.service';
import { GoogleBookApiService } from 'src/app/services/google.books.api.service';
import { map } from 'rxjs/operators';
import { NavigationHelperService } from 'src/app/services/navigation-helper.service';
import { Observable } from 'rxjs';
import { ApiBookResponse } from 'src/app/common-interfaces/api-response/api.book-response.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book = <Book>{ id: null };
  public hasError: boolean = false;
  constructor(private route: ActivatedRoute,
    private searchBookService: BookSearchService,
    private googleBookApiService: GoogleBookApiService,
    private navigationHelperService: NavigationHelperService) { }

  ngOnInit() {
    this.setSelectedBook();
  }

  public backToResults() {
    this.navigationHelperService.backToResults();
  }

  private getBookId(): string {
    return this.route.snapshot.paramMap.get('bookId');
  }

  private setSelectedBook(): void {
    let bookId = this.getBookId();
    if (this.searchBookService.getResultBooksMap() != null) {
      this.book = this.searchBookService.getResultBooksMap().get(bookId);
    } else {
      this.setBook(this.googleBookApiService.getBookById(bookId));
    }
  }

  private setBook(response: Observable<ApiBookResponse>) {
    response.subscribe(() => {
      response.pipe(
        map(response => {
          let thumbnail = 'assets/images/nocover.jpg';
          if (response.volumeInfo.imageLinks != null) {
            thumbnail = response.volumeInfo.imageLinks.thumbnail;
          }
          return <Book>{
            id: response.id,
            title: response.volumeInfo.title,
            description: response.volumeInfo.description,
            authors: response.volumeInfo.authors,
            coverImageUrl: thumbnail
          }
        }
        )
      ).subscribe(book => {
        this.book = book;
      });
    }, error => this.errorHandler(error))
  }

  private errorHandler(error) {
    this.hasError = true;
    console.log('errorObject: ', error);
    throw new Error('An error occureed during the Http get call!');
  }
}
