import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators';

import { LoginForm } from '../models/LoginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  isUserAuthenticated: boolean = false
  isAdmin: boolean = false
  
  private userAuthenticatedSubject = new Subject<boolean>()
  private adminSubject = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { 
    this.checkCredentials()
  }

  login(loginFormCredentials: LoginForm){
      return this.http.post("https://localhost:5001/api/auth/login", loginFormCredentials).pipe(
        map((response: any) => {
          localStorage.setItem("jwt", response.token)
          
          this.checkCredentials()
        })
      )
  }

  logout(){
    localStorage.removeItem("jwt")
    this.checkCredentials()
  }

  checkCredentials() {
    const token = localStorage.getItem("jwt")

    if(token && !this.jwtHelper.isTokenExpired(token)) {
      this.isUserAuthenticated = true
      this.userAuthenticatedSubject.next(this.isUserAuthenticated)

      const decodedToken = this.jwtHelper.decodeToken(token)

      if(decodedToken.Role == "Admin"){
        this.isAdmin = true
        this.adminSubject.next(this.isAdmin)
      }
    }
    else if(token && this.jwtHelper.isTokenExpired(token)){
      localStorage.removeItem("jwt")
    }
  }

  onAuthenticate(): Observable<boolean> {
    return this.userAuthenticatedSubject.asObservable()
  }

  onAdmin(): Observable<boolean> {
    return this.adminSubject.asObservable()
  }
}
