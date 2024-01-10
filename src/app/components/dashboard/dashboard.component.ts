import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';
import * as _ from "lodash";
// import { jsPDF } from "jspdf";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild('contentpdf', { static: false }) el!: ElementRef;

  constructor(
    private salesService: SalesService
  ) { }

  salesMonth;
  salesYear;
  yearActual;

  ngOnInit(): void {
    var currentTime = new Date();
    this.yearActual = currentTime.getFullYear()
    this.monthDataChart()
    this.yearDataChart();
  }

  // single: any[];
  view: [number, number] = [700, 400];
  viewYear: [number, number] = [500, 400];


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  monthDataChart() {

    this.salesService.getSales().subscribe({
      next: (res) => {
        this.salesMonth = _.filter(res, { 'year': this.yearActual })

        this.salesMonth = this.salesMonth.map(function (elem) {
          let returnObjeto = { name: elem.month, value: elem.total };
          return returnObjeto;
        });

        let enero = _.filter(this.salesMonth, ['name', 'Enero'])
        let febrero = _.filter(this.salesMonth, ['name', 'Febrero'])
        let marzo = _.filter(this.salesMonth, ['name', 'Marzo'])
        let abril = _.filter(this.salesMonth, ['name', 'Abril'])
        let mayo = _.filter(this.salesMonth, ['name', 'Mayo'])
        let junio = _.filter(this.salesMonth, ['name', 'Junio'])
        let julio = _.filter(this.salesMonth, ['name', 'Julio'])
        let agosto = _.filter(this.salesMonth, ['name', 'Agosto'])
        let septiembre = _.filter(this.salesMonth, ['name', 'Septiembre'])
        let octubre = _.filter(this.salesMonth, ['name', 'Octubre'])
        let noviembre = _.filter(this.salesMonth, ['name', 'Noviembre'])
        let diciembre = _.filter(this.salesMonth, ['name', 'Diciembre'])

        const monthResults = {};

        [
          ...enero,
          ...febrero,
          ...marzo,
          ...abril,
          ...mayo,
          ...junio,
          ...julio,
          ...agosto,
          ...septiembre,
          ...octubre,
          ...noviembre,
          ...diciembre
        ].map(result => {
          const partialResult = monthResults[result.name];
          monthResults[result.name] = partialResult ? partialResult + result.value : result.value;
        });

        // Pasamos los resultados al formato array indicado
        const totalsMonth = Object
          .keys(monthResults)
          .map(totalResult => (
            {
              name: totalResult,
              value: monthResults[totalResult]
            }
          ));

        // Mostramos por consola
        this.salesMonth = totalsMonth;

      },

      error: (e) => {
        console.log(e);
      }
    })

  }


  yearDataChart() {
    this.salesService.getSales().subscribe({
      next: (res) => {

        console.log(res)
        // this.salesYear = _.filter(res, { 'year': this.yearActual })

        this.salesYear = res.map(function (elem) {
          let returnObjeto = { name: elem.year, value: elem.total };
          return returnObjeto;
        });

        console.log(this.salesYear)

        let dosmil22 = _.filter(this.salesYear, ['name', 2022])
        let dosmil23 = _.filter(this.salesYear, ['name', 2023])
        let dosmil24 = _.filter(this.salesYear, ['name', 2024])
        let dosmil25 = _.filter(this.salesYear, ['name', 2025])
        let dosmil26 = _.filter(this.salesYear, ['name', 2026])
        let dosmil27 = _.filter(this.salesYear, ['name', 2027])
        let dosmil28 = _.filter(this.salesYear, ['name', 2028])
        let dosmil29 = _.filter(this.salesYear, ['name', 2029])

        const monthResults = {};
        const yearResults = {};

        // Calculamos totales Anios
        [
          ...dosmil22,
          ...dosmil23,
          ...dosmil24,
          ...dosmil25,
          ...dosmil26,
          ...dosmil27,
          ...dosmil28,
          ...dosmil29,
        ].map(result => {
          const partialResult = yearResults[result.name];
          yearResults[result.name] = partialResult ? partialResult + result.value : result.value;
        });

        // Pasamos los resultados al formato array indicado
        const totalsYears = Object
          .keys(yearResults)
          .map(totalResult => (
            {
              name: totalResult,
              value: yearResults[totalResult]
            }
          )
          );

        // Mostramos por consola
        this.salesYear = totalsYears;

        console.log(this.salesYear)

      },

    })
  }


  get dataMonth() {
    return this.salesMonth
  }


  get dataYear() {
    return this.salesYear
  }


}
