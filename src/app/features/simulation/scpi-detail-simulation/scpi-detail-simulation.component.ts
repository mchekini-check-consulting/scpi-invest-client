import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {Localizations, Sectors} from "../../../core/model/scpi-detail.model";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-scpi-detail-simulation',
  standalone: true,
  imports: [
    ChartModule,
    DecimalPipe
  ],
  templateUrl: './scpi-detail-simulation.component.html',
  styleUrl: './scpi-detail-simulation.component.css'
})
export class ScpiDetailSimulationComponent implements OnInit, OnChanges{

  @Input("totalValue") totalValue!: number;
  @Input("totalCashback") totalCashback!: number;
  @Input("totalInvested") totalInvested!: number;
  @Input("totalMonthlyIncomes") totalMonthlyIncomes!: number;
  @Input("tax") tax!: number;
  @Input("monthlyIncomeAfterTax") monthlyIncomeAfterTax!: number;

  @Input("chartsName") chartsName!: {name: string, totalInvest: number} [];

  @Input("chartsCountry") chartsCountry!: Localizations;
  @Input("chartsSector") chartsSector!: Sectors;


  data_chart_name: any;
  options_chart_name: any;

  data_chart_country: any;
  options_chart_country: any;

  data_chart_sector: any;
  options_chart_sector: any;

   availableColors = [
    '--blue-500',
    '--orange-500',
    '--green-500',
    '--red-500',
    '--purple-500',
    '--yellow-500',
     '--pink-500',
     '--teal-500',
     '--cyan-500',
     '--lime-500',
     '--amber-500',
     '--indigo-500',
     '--brown-500',
     '--grey-500'
  ];

   availableHoverColors = [
    '--blue-400',
    '--orange-400',
    '--green-400',
    '--red-400',
    '--purple-400',
    '--yellow-400',
     '--pink-400',
     '--teal-400',
     '--cyan-400',
     '--lime-400',
     '--amber-400',
     '--indigo-400',
     '--brown-400',
     '--grey-400'
  ];


  ngOnInit(): void {

    this.setDataChartName();
    this.setDataChartCountry();
    this.setDataChartSector();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["chartsName"]) {
      this.setDataChartName();
      this.setDataChartCountry();
      this.setDataChartSector();
    }
  }

  setDataChartName() {

    let percentInvestForEachScpi = this.chartsName.map(scpi => scpi.totalInvest);
    let scpiNames = this.chartsName.map(scpi => scpi.name);


    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const keys = Object.keys(this.chartsName);
    const backgroundColors = keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableColors[index % this.availableColors.length])
    );

    const hoverBackgroundColors =  keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableHoverColors[index % this.availableHoverColors.length])
    );

    this.data_chart_name = {
      labels: scpiNames,
      datasets: [
        {
          data: percentInvestForEachScpi,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors
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

    const keys = Object.keys(this.chartsCountry);
    const backgroundColors = keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableColors[index % this.availableColors.length])
    );

    const hoverBackgroundColors =  keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableHoverColors[index % this.availableHoverColors.length])
    );

    this.data_chart_country = {
      labels: Object.keys(this.chartsCountry),
      datasets: [
        {
          data: Object.values(this.chartsCountry),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors
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

    const keys = Object.keys(this.chartsCountry);
    const backgroundColors = keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableColors[index % this.availableColors.length])
    );

    const hoverBackgroundColors =  keys.map((_, index) =>
      documentStyle.getPropertyValue(this.availableHoverColors[index % this.availableHoverColors.length])
    );

    this.data_chart_sector = {
      labels: Object.keys(this.chartsSector),
      datasets: [
        {
          data: Object.values(this.chartsSector),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors
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
