import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common-interfaces/cart-item.interface';
import { NavigationHelperService } from 'src/app/services/navigation-helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService,
    private navigationHelperServive: NavigationHelperService) { }

  public removeFromCart(id: string): void {
    this.cartService.removeFromCart(id);
  }

  public backToResults(): void {
    this.navigationHelperServive.backToResults();
  }

  get cartItemsList(): CartItem[] {
    return this.cartService.cartItemsList;
  }
}
