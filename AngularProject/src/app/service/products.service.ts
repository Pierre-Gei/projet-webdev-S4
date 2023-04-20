import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string = 'http://localhost:3000/products/';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url, { withCredentials: true });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product, { withCredentials: true });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.url + product._id, product, { withCredentials: true });
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.url + product._id, { withCredentials: true });
  }

}
