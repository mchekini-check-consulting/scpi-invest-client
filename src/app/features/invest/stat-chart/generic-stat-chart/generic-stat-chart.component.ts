import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-generic-stat-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './generic-stat-chart.component.html',
  styleUrl: './generic-stat-chart.component.css'
})
export class GenericStatChartComponent implements OnInit {
  @Input() chartData: any;
  @Input() chartOptions: any;

  constructor() {}

  ngOnInit(): void {}
}
