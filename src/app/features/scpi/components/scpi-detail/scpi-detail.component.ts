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
import {ScpiDetailModel} from "../../../../core/model/scpi-detail.model";

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

  scpiDetail!:ScpiDetailModel;

  distributionData: any;
  chartDistributionRateOptions: any;

  sectorStrategyData: any;
  chartSectorStrategyOptions: any;

  geoZoneData:any;
  chartZoneGeoOptions: any;

  scpiPartPrice!:number;
  scpiReconstitutionPrice!: number;


  constructor(private route: ActivatedRoute, private scpiService: ScpiService) {
  }



  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.scpiService.getScpiById(id).subscribe(data => {
     this.scpiDetail = data;
     this.setDistributionChartData(data.distributionRate);
     this.setSectorStrategyChartData(data.sectors);
     this.setZoneGeoChartData(data.localizations)
      this.initDifferentScpiValueFromScpiDetail();
    });

  }

  isCurrentPriceInteresting() {
    const priceValues = Object.values(this.scpiDetail.prices);
    const reconstitutionValues  = Object.values(this.scpiDetail.reconstitutionValue)
    if (priceValues[priceValues.length-1] > reconstitutionValues[reconstitutionValues.length-1] ) {
      return "Intéressant";
    } else {
      return "Pas Intéressant";
    }
  }

  initDifferentScpiValueFromScpiDetail():void {
    this.scpiPartPrice = Object.values(this.scpiDetail.prices).slice(-1)[0];
    this.scpiReconstitutionPrice = Object.values(this.scpiDetail.reconstitutionValue).slice(-1)[0];
  }

  setZoneGeoChartData(zoneGeo:{}):void{
    this.geoZoneData = {
      labels: Object.keys(zoneGeo),
      datasets: [
        {
          data: Object.values(zoneGeo),
          backgroundColor: ['#FFEB3B', '#1E88E5', '#AB47BC', '#BDBDBD','#CC65B4'],
          hoverBackgroundColor: ['#FDD835', '#1976D2', '#8E24AA', '#9E9E9E','#CC65B4']
        }
      ]
    };

    this.chartZoneGeoOptions = {
      plugins: {
        legend: {
          display: true,
        }
      }
    };
  }

  setSectorStrategyChartData(sectors:{}):void{
    this.sectorStrategyData = {
      labels: Object.keys(sectors),
      datasets: [
        {
          data: Object.values(sectors),
          backgroundColor: ['#FFEB3B', '#1E88E5', '#AB47BC', '#BDBDBD','#CC65B4'],
          hoverBackgroundColor: ['#FDD835', '#1976D2', '#8E24AA', '#9E9E9E','#CC65B4']
        }
      ]
    };

    this.chartSectorStrategyOptions = {
      plugins: {
        legend: {
          display: true,
        }
      }
    };
  }


  setDistributionChartData(distributionRate:{}):void{
    this.distributionData = {
      labels: Object.keys(distributionRate),
      datasets: [
        {
          label: 'Distribution',
          data: Object.values(distributionRate),
          fill: true,
          borderColor: '#2e70fa',
          backgroundColor: 'rgba(46, 112, 250, 0.2)',
          tension: 0.1
        }
      ]
    };


    this.chartDistributionRateOptions = {
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

  }


}
