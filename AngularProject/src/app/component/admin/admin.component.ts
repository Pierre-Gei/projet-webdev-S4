import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Message } from 'src/app/model/message';
import { ProductsService } from 'src/app/service/products.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listeProduct: Array<Product> = [];
  listeMessage: Array<Message> = [];
  newProduct: Product = {
    name: '',
    quantity: 0
  };
  selectedProduct: Product = {
    name: '',
    quantity: 0
  };

  constructor(private userService: UserService, private productService: ProductsService,private messageService: MessagesService, private router: Router) { }
  async ngOnInit() {
    try{
      const products = await lastValueFrom(this.productService.getProducts());
      if (products) {
        this.listeProduct = products;
      }
      const messages = await lastValueFrom(this.messageService.getMessages());
      if (messages) {
        this.listeMessage = messages;
      }
    } catch (err) {
      this.router.navigate(['login']);
    }
  }

  add(product: Product) {
    if (!product.name || !product.quantity) {
      return;
    }
    this.productService.addProduct(product).subscribe(() => {
      this.listeProduct.push(product);
      this.newProduct = {
        name: '',
        quantity: 0
      };
    });
  }

  removeProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.listeProduct = this.listeProduct.filter(p => p._id !== product._id);
    });
  }

  updateP(product: Product) {
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

  removeMessage(message: Message) {
    this.messageService.deleteMessage(message).subscribe(() => {
      this.listeMessage = this.listeMessage.filter(m => m._id !== message._id);
    });
  }

  updateM(message: Message) {
    message.read = !message.read;
    this.messageService.updateMessage(message).subscribe(() => {
      this.listeMessage = this.listeMessage.map(m => {
        if (m._id === message._id) {
          return message;
        }
        return m;
      });
    }
    );
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}