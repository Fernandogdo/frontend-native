import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { Sale } from "../../interfaces/Sale";
import { Global } from '../global/global';
import { Sale } from 'src/app/interfaces/Sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = Global.url;
  }


  createSale(sale) {
    return this.http.post(this.url + 'sales', sale);
  }

  getSales() {
    return this.http.get<Sale[]>(this.url + 'sales');
  }

  getSale(id: string) {
    return this.http.get<Sale>(`${this.url}sales/${id}`);
  }

  deleteSale(id: string) {
    return this.http.delete(`${this.url}sales/${id}`);
  }

  updateSale(id: string, title: string, description: string) {
    return this.http.put(`${this.url}/sales${id}`, { title, description });
    
  }

}

