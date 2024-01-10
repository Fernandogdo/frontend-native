import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales/sales.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Sale } from 'src/app/interfaces/Sale';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html',
  styleUrls: ['./detail-sale.component.scss']
})
export class DetailSaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['title', 'price_purchase', 'price_sale', 'date', 'total'];
  dataSource;;

  idSale: string;
  sale: Sale
  productsSale;
  titleSale: string;
  descriptionSale: string;
  dateSale;
  pipe = new DatePipe('en-US');
  totalVentas: number;
  arrayProducts;

  constructor(
    private salesService: SalesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idSale = this.route.snapshot.params["id"];
    this.getSail();
  }

  getSail() {
    this.salesService.getSale(this.idSale).subscribe((res) => {
      console.log(res)
      this.sale = res;
      this.productsSale = this.sale.products;
      this.titleSale = this.sale.title;
      this.dateSale = this.pipe.transform(res.date, 'dd/MM/yyyy');
      this.descriptionSale = this.sale.description;
      console.log('productSale', this.productsSale)
      this.dataSource = new MatTableDataSource(this.productsSale);
      this.dataSource.paginator = this.paginator;
    })
  }

  getTotalCost() {

    if (this.productsSale) {
      this.totalVentas = this.productsSale.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
    } else {
      this.totalVentas = this.productsSale
    }

    return this.totalVentas;
  }

}
