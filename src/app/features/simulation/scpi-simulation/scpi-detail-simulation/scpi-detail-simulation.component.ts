import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-scpi-detail-simulation',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './scpi-detail-simulation.component.html',
  styleUrl: './scpi-detail-simulation.component.css'
})
export class ScpiDetailSimulationComponent implements OnInit{

  data: any;
  options: any;

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }


}
