import { Component, OnInit } from '@angular/core';
import { StatScpiService } from "../../../core/service/statistique_service/stat-scpi.service";
import { StatScpiModel } from "../../../core/model/stat-scpi.models";
import { ChartModule } from "primeng/chart";
import {EvalScpiModels} from "../../../core/model/eval-scpi.models";

@Component({
  selector: 'app-stat-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.css']
})
export class StatChartComponent implements OnInit {
  public regionChartData: any;
  public sectorChartData: any;
  public evolutionChartData: any;
  public options: any;

  constructor(private statScpiService: StatScpiService) {
  }

  ngOnInit(): void {
    this.loadRegionData();
    this.loadSectorData();
    this.loadEvolutionData();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const label = tooltipItem.label || '';
              const value = tooltipItem.raw;
              return label + ': ' + value + '%';
            }
          }
        }
      }
    };
  }

  private loadRegionData() {
    this.statScpiService.getRegionScpiService().subscribe((response: any) => {
        const data = response.regions;
        this.prepareChartData(data, 'region');
      },
      (error) => {
        console.error('Erreur lors du chargement des données de région', error);
      }
    );
  }

  private loadSectorData() {
    this.statScpiService.getSecteurScpiService().subscribe((response: any) => {
        const data = response.secteurs;
        this.prepareChartData(data, 'secteur');
      },
      (error) => {
        console.error('Erreur lors du chargement des données de secteur', error);
      });
  }

  private loadEvolutionData() {
    this.statScpiService.getEvolutionScpiService().subscribe((response: any) => {
        const data = response.evolutionPrices;
        this.prepareEvolutionChartData(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des données d\'évolution', error);
      });
  }


  private prepareChartData(data: StatScpiModel[], type: string): void {
    const labels = data.map(item => type === 'region' ? item.region : item.secteur);
    const percentages = data.map(item => item.percentage);
    console.log(`Données pour ${type}:`, {labels, percentages});
    const documentStyle = getComputedStyle(document.documentElement);


    const chartData = {
      labels: labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400')
          ]
        }
      ]
    };

    if (type === 'region') {
      this.regionChartData = chartData;
    } else {
      this.sectorChartData = chartData;
    }
  }

  private prepareEvolutionChartData(data: any) {
    const documentStyle = getComputedStyle(document.documentElement);

    const years = data.map((item: any) => item.year);
    const sectorPrices = data.map((item: any) => item.sectorPrice);
    const regionPrices = data.map((item: any) => item.regionPrice);



    this.evolutionChartData = {
      labels: years,
      datasets: [
        {
          label: 'Prix des Parts - Secteurs',
          data: sectorPrices,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Prix des Parts - Régions',
          data: regionPrices,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };
  }
}


