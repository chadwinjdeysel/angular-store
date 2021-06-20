import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ItemInCartComponent } from './components/item-in-cart/item-in-cart.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryButtonComponent } from './components/category-button/category-button.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';

export function tokenGetter() {
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCardComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    ItemInCartComponent,
    CartComponent,
    CategoryButtonComponent,
    AdminOrdersComponent,
    AdminProductsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
