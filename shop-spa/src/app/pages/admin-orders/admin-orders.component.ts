import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders : Order[] = []


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/orders')
      .subscribe((response: Order[]) => {
        this.orders = response
      }, err => {
        console.log(err)
      })
  }

}
