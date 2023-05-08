import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Message } from 'src/app/model/message';
import { ProductsService } from 'src/app/service/products.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-adminProducts',
  templateUrl: './adminProducts.component.html',
  styleUrls: ['./adminProducts.component.css']
})
export class AdminProductsComponent implements OnInit {

  listeProduct: Array<Product> = [];
  newProduct: Product = {
    name: '',
    quantity: 0,
    
  };
  selectedProduct: Product = {
    name: '',
    quantity: 0,
    
  };
  editing: boolean = false;
  adding: boolean = false;

  constructor(private userService: UserService, private productService: ProductsService,private messageService: MessagesService, private router: Router) { }
  // async ngOnInit() {
  //   try{
  //     const products = await lastValueFrom(this.productService.getProducts());
  //     if (products) {
  //       this.listeProduct = products;
  //     }
  //   } catch (err) {
  //     this.router.navigate(['login']);
  //   }
  // }

  async ngOnInit() {
    try{
      const products = await lastValueFrom(this.productService.getProducts());
      if (products) {
        this.listeProduct = products;
        this.sortProducts();
      }
    } catch (err) {
      this.router.navigate(['login']);
    }
  }

  add(product: Product) {
    if (!product.name || !product.quantity) {
      return;
    }
    this.adding = false;
    this.productService.addProduct(product).subscribe((newProduct: Product) => {
      this.listeProduct.push(newProduct);
      this.newProduct = {
        name: '',
        quantity: 0
      };
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.listeProduct = products;
        this.sortProducts();
      });
    });
  }

  sortProducts() {
    this.listeProduct.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  addingProduct() {
    this.adding = true;
  }
  cancelAdding() {
    this.adding = false;
  }

  removeProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.listeProduct = this.listeProduct.filter(p => p._id !== product._id);
    });
  }

  updateP(product: Product) {
    console.log(product);
    this.productService.updateProduct(product).subscribe(() => {
      this.listeProduct = this.listeProduct.map(p => {
        if (p._id === product._id) {
          return product;
        }
        return p;
      });
    });
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  validateProduct(product: Product) {
    product.editable = false;
    this.updateP(product);
  }

  toggleEditing(product: Product) {
    console.log(product);
    product.editable = !product.editable; 
    console.log(product);
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}