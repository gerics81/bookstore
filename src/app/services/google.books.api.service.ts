import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBookListResponse } from '../common-interfaces/api-response/api.book-list-response.interface';
import { ApiBookResponse } from '../common-interfaces/api-response/api.book-response.interface';

@Injectable()
export class GoogleBookApiService {

    private apiUrl: string = 'https://www.googleapis.com/books/v1/volumes';

    constructor(private httpClient: HttpClient) { }

    public searchBooks(searchKey: string, startIndex: number, maxResults: number): Observable<ApiBookListResponse> {
        return this.httpClient.get<ApiBookListResponse>(this.apiUrl + '?q=' + searchKey + '&maxResults=' + maxResults + '&startIndex=' + startIndex);
    }

    public getBookById(id: string): Observable<ApiBookResponse> {
        return this.httpClient.get<ApiBookResponse>(this.apiUrl + '/' + id);
    }
}
