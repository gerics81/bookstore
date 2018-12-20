import { Injectable } from '@angular/core';
import { CartItem } from '../common-interfaces/cart-item.interface';
import { BookSearchService } from './book-search.service';
import { PersistenceService } from './persistence.service';


@Injectable()
export class CartService {
    private cartItemsMap: Map<string, CartItem>;
    public cartItemsList: CartItem[];

    constructor(private searchBookService: BookSearchService,
        private persistenceService: PersistenceService) {
        this.cartItemsMap = new Map;
    }

    public setCartContent(content: Map<string, CartItem>): void {
        this.cartItemsMap = content;
        this.createCartItemList();
    }

    public addToCart(id: string): void {
        if (this.cartItemsMap.get(id) == null) {
            this.cartItemsMap.set(id, {
                quantity: 1,
                book: this.searchBookService.getResultBooksMap().get(id)
            }
            );
        } else {
            this.cartItemsMap.get(id).quantity++;
        }
        this.createCartItemList();
        this.storeCart();
    }

    public removeFromCart(id: string) {
        if (this.cartItemsMap.get(id) != null) {
            let quantity = this.cartItemsMap.get(id).quantity;
            if (quantity - 1 == 0) {
                this.cartItemsMap.delete(id);
            } else {
                this.cartItemsMap.get(id).quantity--;
            }
            this.createCartItemList();
            this.storeCart();
        }
    }

    private createCartItemList(): void {
        this.cartItemsList = [];
        this.cartItemsMap.forEach((value: CartItem) => {
            this.cartItemsList.push(value);
        });
    }

    private storeCart() {
        this.persistenceService.put('stored-cart',
            JSON.stringify(Array.from(this.cartItemsMap.entries())));
    }

    get cartItems(): Map<string, CartItem> {
        return this.cartItemsMap;
    }
}