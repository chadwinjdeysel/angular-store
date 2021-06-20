import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean
  isAuthenticated: boolean

  authenticatedSubscription: Subscription
  adminSubscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.authenticatedSubscription = this.authService
      .onAuthenticate()
      .subscribe(value => this.isAuthenticated = value)

    this.authenticatedSubscription = this.authService
      .onAdmin()
      .subscribe(value => this.isAdmin = value)
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserAuthenticated
    this.isAdmin = this.authService.isAdmin
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
