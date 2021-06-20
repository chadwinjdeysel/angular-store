import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../models/Product'
import { Category } from 'src/app/models/Category';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  categories: Category[] = []

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts()

    this.productService
        .getCategories()
        .subscribe((categories: Category[]) => (
          this.categories = categories
        ))  
  }

  addToCart(product: Product){
    const token = localStorage.getItem("jwt")
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      this.cartService.addToCart(product);
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  getProducts(category?: number) {
    this.productService
      .get(category)
      .subscribe((products: Product[]) => (
        this.products = products
      ))
  }
}
