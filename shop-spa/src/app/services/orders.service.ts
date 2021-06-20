import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PlaceOrder } from '../models/PlaceOrder';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cartService: CartService,
    private router: Router
  ) { }

  placeOrder(totalPrice: number) {
    const token = localStorage.getItem("jwt")
    
    if(token && !this.jwtHelper.isTokenExpired(token)){
      let order = {} as PlaceOrder
      order.orderTotal = totalPrice

      const decodedToken = this.jwtHelper.decodeToken(token)
      order.userId = decodedToken.UserId

      this.http.post('https://localhost:5001/api/orders', order)
        .subscribe(result => {
          this.cartService.clearCart()
          this.router.navigate(["/"])

          // navigate success page
        }, err => {
          console.log(err)
        })
    }
    
  }
}
