import { Component } from '@angular/core';
import { GoogleBookApiService } from '../../services/google.books.api.service'
import { Book } from '../../common-interfaces/book.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BookSearchService } from 'src/app/services/book-search.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent {
  private maxResults: number = 10;
  public searchKey: string;
  public lastAddedBookTitle = null;
  private startIndex: number;
  private loadEvent: any;
  private isPreviousPage: boolean;
  private isNextPage: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private searchBookService: BookSearchService,
    private goolgeBookApiService: GoogleBookApiService,
    private cartService: CartService) {
    this.loadEvent = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getQueryParameters();
        this.searchKey = this.getSearchKey();
        this.searchBooks();
      }
    });
  }

  public addToCart(id: string): void {
    this.lastAddedBookTitle = this.searchBookService.getResultBooksMap().get(id).title;
    this.cartService.addToCart(id);
  }

  public previousPage(): void {
    if (this.isPreviousPage) {
      this.router.navigateByUrl('/search-result/' + this.searchKey + '?start_value=' + (this.startIndex - this.maxResults));
    }
  }

  public nextPage(): void {
    if (this.isNextPage) {
      this.router.navigateByUrl('/search-result/' + this.searchKey + '?start_value=' + (this.startIndex + this.maxResults));
    }
  }

  private searchBooks(): void {
    if (this.searchBookService.lastSearchKey != this.searchKey
      || this.searchBookService.lastStartIndex != this.startIndex) {
      this.searchBookService.loading = true;
      this.searchBookService.lastSearchKey = this.searchKey;
      this.searchBookService.lastStartIndex = this.startIndex;
      this.searchBookService.setResultBooks(
        this.goolgeBookApiService.searchBooks(this.searchKey, this.startIndex, this.maxResults));
    }
  }

  private getQueryParameters(): void {
    this.route.queryParams.subscribe(parameters => {
      if (parameters['start_value'] != null) {
        this.startIndex = parseInt(parameters['start_value'], 10);
      } else {
        this.startIndex = 0;
      }
    });
  }

  private getSearchKey(): string {
    return this.route.snapshot.paramMap.get('searchKey');
  }

  get previousPageIsDisabled(): string {
    if (this.startIndex - this.maxResults >= 0) {
      this.isPreviousPage = true;
      return null;
    } else {
      this.isPreviousPage = false;
      return 'disabled';
    }

  }

  get nextPageIsDisabled(): string {
    if (this.startIndex + this.maxResults <= this.searchBookService.getNumberOfBooks()) {
      this.isNextPage = true;
      return null;
    } else {
      this.isNextPage = false;
      return 'disabled';
    }

  }

  get resultBooks(): Array<Book> {
    return this.searchBookService.getResultBooksList();
  }

  get loading(): boolean {
    return this.searchBookService.loading;
  }

  get hasError(): boolean {
    return this.searchBookService.errorOcurred;
  }

  ngOnDestroy(): void {
    this.loadEvent.unsubscribe();
  }

}


