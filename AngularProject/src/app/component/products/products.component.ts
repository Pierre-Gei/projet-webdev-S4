import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/service/products.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProduct: Array<Product> = [];
  listProductFilter: Array<Product> = [];
  searchText: string = '';


  constructor(private productService: ProductsService) {
  }

  async ngOnInit() {
    try {
      const products = await lastValueFrom(this.productService.getProducts());
      if (products) {
        this.listProduct = products;
        this.listProductFilter = this.listProduct;
      }
    } catch (err) {
      console.log(err);
    }
  }

  searchProducts(event: any) {
    this.searchText = event.target.value;
    this.listProductFilter = this.listProduct.filter((product) => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

}
