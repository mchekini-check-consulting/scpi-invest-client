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

  data_chart_name: any;
  options_chart_name: any;

  data_chart_country: any;
  options_chart_country: any;

  data_chart_sector: any;
  options_chart_sector: any;

  ngOnInit(): void {

    this.setDataChartName();
    this.setDataChartCountry();
    this.setDataChartSector();
  }

  setDataChartName() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data_chart_name = {
      labels: ['IROKO ZEN', 'Transition Europe', 'Comète'],
      datasets: [
        {
          data: [30, 60, 10],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options_chart_name = {
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


  setDataChartCountry() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data_chart_country = {
      labels: ['FRANCE', 'ITALIE', 'ESPAGNE'],
      datasets: [
        {
          data: [20, 30, 50],
          backgroundColor: [
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--orange-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

    this.options_chart_country = {
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

  setDataChartSector() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data_chart_sector = {
      labels: ['BUREAUX', 'SANTE', 'COMMERCE'],
      datasets: [
        {
          data: [10, 20, 70],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-300'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--green-400')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

    this.options_chart_sector = {
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
