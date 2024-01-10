import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from "../../interfaces/Sale";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as _ from "lodash";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  providers: [CurrencyPipe, DatePipe],

})
export class SaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'description', 'date', 'total_sale', 'total_spends', 'total_earnings', 'opciones'];
  displayedVatColumns = ['TotalSale', 'relleno', 'relleno2', 'Total_sale', 'Total_spends', 'Total_earnings1', 'relleno3'];
  // displayedEarningColumns = ['TotalEarnings', 'guion1', 'guion2', 'guion3', 'Total_earnings', 'guion4'];

  arraySales: Sale[] = [];
  arraySalesCsv;
  arraySalesYear: Sale[] = [];

  dataSource;
  // opcionSeleccionada;
  totalVentas: number;
  totalCostos: number;
  totalGanancias: number;
  yearActual;
  yearSelect;
  confPersoDocenteClas;

  years = [
    '2022', '2023', '2024', '2025'
  ]

  constructor(
    private salesService: SalesService,
    private _snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.getSales()
    var currentTime = new Date();
    this.yearActual = currentTime.getFullYear()
    this.setIntrvl()
    this.yearSelect = currentTime.getFullYear()
  }


  //Generate Report CSV of Sale for year
  generateCsv() {
    this.arraySalesCsv = this.arraySalesYear
      .filter(sale => (sale.year === this.yearSelect || this.yearActual))
      .map(sale => (
        {
          title: sale.title,
          description: sale.description,
          date: `${this.datePipe.transform(sale.date, 'dd-MM-yyyy')}`,
          total: `${this.currencyPipe.transform(sale.total, '$')}`,
        }
      ));

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Productos',
      useBom: true,
      noDownload: false,
      headers: ["Título", "Descripción", "Fecha", "Total"]
    };

    //Add Total of sales to array of sales
    const totalSale = {
      '': 'Total Ventas',
      'relleno': '',
      'relleno2': '',
      'Total':`${this.currencyPipe.transform(this.totalVentas, '$')}`
    }
    this.arraySalesCsv.push(totalSale)


    //Create File CSV for download
    new ngxCsv(this.arraySalesCsv, 'Ventas', options);
  }

  //Filter for title, description and total of sale 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Get all the sales
  getSales() {
    this.salesService.getSales().subscribe({
      next: (res) => {
        this.arraySales = res;
        

        //Order array by date
        this.arraySales.sort(function (x, y) {
          var firstDate = new Date(x.date),
            SecondDate = new Date(y.date);

          if (firstDate > SecondDate) return -1;
          if (firstDate < SecondDate) return 1;
          return 0;
        });

        console.log('arraySales', this.arraySales);

        this.dataSource = new MatTableDataSource(this.arraySales);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  //Filter year
  filterYear($event) {
    this.yearSelect = parseInt($event)

    console.log('Anio', this.yearSelect)
    this.arraySalesYear = _.filter(this.arraySales, ['year', this.yearSelect])
    // console.log('filtro', this.arraySalesYear)
    this.dataSource = new MatTableDataSource(this.arraySalesYear);
    this.dataSource.paginator = this.paginator;
  }


  //Delere Sale for id of sale
  deleteSale(id, titleSale) {
    this.salesService.deleteSale(id).subscribe({
      next: (res) => {
        this._snackBar.open("Venta " + titleSale + " eliminada", "Cerrar", {
          duration: 3000,
        });
        this.getSales();
        this.setIntrvl();
        this.getTotalSpends();
        this.getTotalYear();

      },
      error: (err) => {
        this._snackBar.open("Error al eliminar venta " + titleSale, "Cerrar", {
          duration: 3000,
        });
      }
    });
  }


  //Get cost total for year of sale
  getTotalYear() {
    this.totalVentas = 0
    this.totalVentas = this.arraySalesYear.map(t => t.total).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }


  getTotalSpends() {
    this.totalCostos = 0
    this.totalCostos = this.arraySalesYear.map(t => t.total_spends).reduce((acc, value) => acc + value, 0);
    return this.totalCostos;
  }


  getTotalEarnings() {
    this.totalGanancias = 0
    this.totalGanancias = this.arraySalesYear.map(t => t.total - t.total_spends).reduce((acc, value) => acc + value, 0);
    return this.totalGanancias;
  }

  //Refresh method filtroYear
  setIntrvl() {
    setTimeout(() => this.filterYear(this.yearSelect), 900);
    setTimeout(() => this.getTotalYear(), 900);
  }


  alert() {
    Swal.fire(
      `El reporte de ventas por defecto se genera en el año ${this.yearActual}`,
      'Para cambiar el año dirijase a la sección de filtro por años, y seleccione el año en el que desea generar el reporte de ventas',
      'info'
    );
  }
}
