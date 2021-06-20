import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models/Product' 
import { Category } from '../models/Category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:5001/api/products'

  constructor(
    private http: HttpClient
  ) { }

  get(category?: number): Observable<Product[]> {
    console.log(category)

    if(category == undefined) {
      return this.http.get<Product[]>(`${this.apiUrl}`)
    }
    else if(category == 0)
      return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`)
    else 
      return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`)
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  add(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product, httpOptions)
  }

  edit(product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}`, product, httpOptions)
  }
}
