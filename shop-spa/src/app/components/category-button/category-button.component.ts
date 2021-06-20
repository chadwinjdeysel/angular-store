import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent implements OnInit {
  @Input() category: Category

  @Output() toggleCategory = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleCategory.emit()
  }

}
