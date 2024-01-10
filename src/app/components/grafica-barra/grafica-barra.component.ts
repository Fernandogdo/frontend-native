import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styleUrls: ['./grafica-barra.component.scss']
})
export class GraficaBarraComponent implements OnInit {

  @Input() results: any[] = [];

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Ventas';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Cantidad Vendida en $';

  colorScheme = 'nightLights';

  constructor() { }

  ngOnInit(): void {
  }

}
