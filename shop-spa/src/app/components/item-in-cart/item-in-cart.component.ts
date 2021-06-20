import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-item-in-cart',
  templateUrl: './item-in-cart.component.html',
  styleUrls: ['./item-in-cart.component.scss']
})
export class ItemInCartComponent implements OnInit {
  @Input() product : Product
  
  constructor() { }

  ngOnInit(): void {
  }

}
