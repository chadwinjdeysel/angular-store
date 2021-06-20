import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup } from '@angular/forms'

import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = []
  isEditing: boolean

  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    id: new FormControl(''),
    category: new FormControl(0)
  })
  

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.get()
    .subscribe((products: Product[]) => (
      this.products = products
    ))

    this.isEditing = false
  }

  delete(product: Product) {
    
    if(confirm("are your sure you want to delete this product?")){
      this.productService.delete(product.id)
        .subscribe(response => {
          this.products = this.products.filter(
            p => p.id !== product.id
          )    
        }, error => {
          alert('There was an error deleting this product')
        })
    }

  }

  updateProduct(){
    let product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      id: this.productForm.value.id,
      categoryValue: this.productForm.value.category,
      category: ''
    } as Product

    if(!this.isEditing) {
      this.productService.add(product)
        .subscribe((response : Product) => {
          this.products.push(response)
          this.resetForm()
        }, err => console.log(err))
    }
    else{ 
      this.productService.edit(product)
        .subscribe((response : Product) => {
          let index = this.products.map((product) => { return product.id }).indexOf(response.id)   
          this.products[index] = response
          this.resetForm()
        }, err => console.log(err))
    }
    
  }

  editProduct(product: Product) {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      id: product.id,
      category: product.categoryValue
    })

    this.isEditing = true
  }

  resetForm() {
    this.productForm.patchValue({
      name: '',
      price: 0,
      id: '',
      category: 0
    })
  }

}
