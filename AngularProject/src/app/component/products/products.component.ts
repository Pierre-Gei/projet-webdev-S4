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

  listeProduct: Array<Product> = [];

  constructor( private productService: ProductsService) { }

  async ngOnInit() {
    try {
      const products = await lastValueFrom(this.productService.getProducts());
      if (products) {
        this.listeProduct = products;
      }
    } catch (err){
      console.log(err);
    }

  }

}
