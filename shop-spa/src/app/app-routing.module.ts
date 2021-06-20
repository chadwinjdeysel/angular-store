import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardService } from './guards/admin-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';


const routes: Routes = [
  {path: "", component: ProductsComponent },
  {path: "cart", component: CartComponent, canActivate: [AuthGuardService] },
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent, canActivate: [AdminGuardService]},
  {path: "admin/products", component: AdminProductsComponent, canActivate: [AdminGuardService]},
  {path: "admin/orders", component: AdminOrdersComponent, canActivate: [AdminGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
