import { Component } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistenceService } from 'src/app/services/persistence.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {

  public searchKey: string;
  constructor(private persistenceService: PersistenceService,
    private router: Router,
    cartService: CartService) {
    if (persistenceService.get('stored-cart')) {
      cartService.setCartContent(new Map(JSON.parse(persistenceService.get('stored-cart'))));
    }
  }

  public searchBooks(): void {
    this.router.navigateByUrl('/search-result/' + this.searchKey);
  }

  public clearSearchField(): void {
    this.searchKey = '';
  }
}
