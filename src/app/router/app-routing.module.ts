import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../components/cart/cart.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { SearchResultComponent } from '../components/search-result/search-result.component';

const routes: Routes = [
    { path: '', redirectTo: 'search-result/bestseller', pathMatch: 'full' },
    { path: 'search-result/:searchKey', component: SearchResultComponent },
    { path: 'book-details/:bookId', component: BookDetailsComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routing = RouterModule.forRoot(routes);