import { Injectable } from '@angular/core';
import { BookSearchService } from './book-search.service';
import { Router } from '@angular/router';

@Injectable()

export class NavigationHelperService {
    constructor(private router: Router,
        private bookSearchService: BookSearchService) { }

    public backToResults(): void {
        if (this.bookSearchService.getResultBooksMap() != null) {
            this.router.navigateByUrl('/search-result/'
                + this.bookSearchService.lastSearchKey
                + '?start_value='
                + this.bookSearchService.lastStartIndex);
        } else {
            this.router.navigateByUrl('/search-result/bestsellers');
        }
    }
}