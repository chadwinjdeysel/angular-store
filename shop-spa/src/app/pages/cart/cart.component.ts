import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  subsciption: Subscription
  cartItems: Product[]
  itemsInCart: number = 0
  totalPrice: number

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) {
    this.cartItems = this.cartService.getItems()
    this.totalPrice = this.cartService.getTotal()
    this.itemsInCart = this.cartService.getItemsInCart()
  }

  ngOnInit(): void {
  }

  placeOrder() {
    this.ordersService.placeOrder(this.totalPrice)
  }

}
