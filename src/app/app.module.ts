import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AppRoutingModule } from './router/app-routing.module';
import { RouterModule } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { GoogleBookApiService } from './services/google.books.api.service';

import { BookSearchService } from './services/book-search.service';
import { CartService } from './services/cart.service';
import { NavigationHelperService } from './services/navigation-helper.service';
import { PersistenceService } from './services/persistence.service';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    BookDetailsComponent,
    CartComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GoogleBookApiService,
    BookSearchService,
    CartService,
    NavigationHelperService,
    PersistenceService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 