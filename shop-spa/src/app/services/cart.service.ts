import { Injectable } from '@angular/core';

import { Product } from '../models/Product';
// import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems : Product[] = []

  constructor() { }

  addToCart(product: Product):void {
      this.cartItems.push(product)
  }

  getItems() {
    return this.cartItems
  }

  getTotal(): number {
    let total = 0
    this.cartItems.map((product) => {
      total += product.price
    })

    return total
  }

  getItemsInCart():number {
    return this.cartItems.length
  }

  clearCart() {
    this.cartItems = []
  }
}
