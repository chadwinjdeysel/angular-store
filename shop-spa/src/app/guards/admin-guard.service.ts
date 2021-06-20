import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) { }

  canActivate() {
    const token = localStorage.getItem("jwt")

    if(token && !this.jwtHelper.isTokenExpired(token) && this.authService.isAdmin) {
      return true
    }

    this.router.navigate(["login"])
    return false
  }
}
