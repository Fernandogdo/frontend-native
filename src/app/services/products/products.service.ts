import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Global } from '../global/global';
import { Product } from "../../interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // URI = 'http://localhost:3000/api/products';

  public url: string


  constructor(
    private http: HttpClient
  ) {
    this.url = Global.url;
  }

  // title.value, category.value, description.value,  stock.value, price.value, this.file
  createProduct(title: string, category: string, description: string, stock: string, price: string, purchase_price: string, product: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('category', category);
    fd.append('description', description);
    fd.append('stock', stock);
    fd.append('price', price);
    fd.append('purchase_price', purchase_price)
    fd.append('image', product);
    return this.http.post(this.url + 'products', fd);
  }

  getProducts() {
    return this.http.get<Product[]>(this.url + 'products');
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.url}` + 'products/' + `${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.url}` + 'products/' + `${id}`);
  }

  updateProduct(id: string, objetoEdit) {
    return this.http.put(`${this.url}` + '/products/' + `${id}`, objetoEdit);
  }

}
