import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Global } from '../global/global';
import { Categorie } from '../../interfaces/Category'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // URI = 'http://localhost:3000/api/categories';
  public url:string

  constructor(
    private http: HttpClient,
  ) { 
    this.url = Global.url;
  }


  createCategory(title: string, description: string, Category: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', Category);
    return this.http.post(this.url + 'categories', fd);
  }

  getCategories() {
    return this.http.get<Categorie[]>(this.url + 'categories');
  }

  getCategory(id: string) {
    return this.http.get<Categorie>(`${this.url + 'categories'}/${id}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.url + 'categories'}/${id}`);
  }

  updateCategory(id: string, title: string, description: string) {
    return this.http.put(`${this.url + 'categories'}/${id}`, {title, description});
  }


  // getCategories(){
  //   return this.http.get(this.url + 'categories/')
  // }
}


