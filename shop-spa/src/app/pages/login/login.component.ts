import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginForm } from 'src/app/models/LoginForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false
  isUserAdmin: boolean = false
  loginFormCredentials: LoginForm = {} as LoginForm

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
      this.loginFormCredentials.Username = loginForm.value.username
      this.loginFormCredentials.Password = loginForm.value.password

      this.authService.login(this.loginFormCredentials).subscribe(() => {
        this.router.navigate(['/'])
      }, err => {
        console.log(err)
        this.loginFailed = true
      })
  }
  
}
