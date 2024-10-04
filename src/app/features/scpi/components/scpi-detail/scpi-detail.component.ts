import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScpiService} from "../../../../core/service/scpi.service";
import {CardModule} from "primeng/card";
import {NgForOf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";
import {TabViewModule} from "primeng/tabview";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-scpi-detail',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    PanelModule,
    ChartModule,
    TabViewModule,
    InputNumberModule,
    FormsModule
  ],
  providers: [
  ],
  templateUrl: './scpi-detail.component.html',
  styleUrl: './scpi-detail.component.css'
})
export class ScpiDetailComponent implements OnInit {

  distributionData: any;
  chartOptions: any;

  strategyData: any;
  chartOptions2: any;

  constructor(private route: ActivatedRoute, private scpiService: ScpiService) {
  }

  ngOnInit(): void {



    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.scpiService.getScpiById(id).subscribe(data => {
      this.distributionData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Distribution',
            data: [6.1, 6.2, 6.25, 6.3, 6.15],
            fill: true,
            borderColor: '#2e70fa',
            backgroundColor: 'rgba(46, 112, 250, 0.2)',
            tension: 0.1
          }
        ]
      };

      // @ts-ignore
      this.chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: string) {
                return value + ' %';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      };
    });

    this.strategyData = {
      labels: ['Bureaux', 'Commerces', 'Locaux d\'activités', 'Autre'],
      datasets: [
        {
          data: [50, 31, 20, 1],
          backgroundColor: ['#FFEB3B', '#1E88E5', '#AB47BC', '#BDBDBD'],
          hoverBackgroundColor: ['#FDD835', '#1976D2', '#8E24AA', '#9E9E9E']
        }
      ]
    };

    this.chartOptions2 = {
      plugins: {
        legend: {
          display: false  // On cache la légende du graphique car elle est personnalisée en bas
        }
      }
    };
  }



  parts: number = 25;
  investedAmount: number = 5000;
  monthlyRevenue: number = 34;
  cashback: number = 150;

  geoChartData = {
    labels: ['Allemagne', 'Espagne', 'Pays-bas', 'Irlande', 'Pologne'],
    datasets: [
      {
        data: [6, 24, 47, 12, 11],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  strategyChartData = {
    labels: ['Bureaux', 'Hôtels', 'Commerce', 'Logistique', 'Santé'],
    datasets: [
      {
        data: [46, 18, 9, 9, 18],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };


}
