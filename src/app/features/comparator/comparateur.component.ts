import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";
import { ChipsModule } from "primeng/chips";
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";
import { CurrencyPipe } from "@angular/common";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChartModule } from "primeng/chart";
import { ComparatorService } from "../../core/service/comparator.service";

@Component({
  selector: 'app-comparateur',
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
    ChipsModule,
    TableModule,
    Button,
    CurrencyPipe,
    RatingModule,
    TagModule,
    AutoCompleteModule,
    ChartModule
  ],
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit {
  investValue: number = 0;
  chartData: any;
  chartOptions: any;
  scpiColors: string[] = ['#FF6384', '#36A2EB', '#FFCE56'];
  results: any = {
    scpi1: null,
    scpi2: null,
    scpi3: null
  };
  scpis: any[] = [];
  filteredScpis1: any[] = [];
  filteredScpis2: any[] = [];
  filteredScpis3: any[] = [];
  selectedScpi1: any;
  selectedScpi2: any;
  selectedScpi3: any;

  constructor(private comparatorService: ComparatorService) {}

  ngOnInit() {
    this.loadScpis();
    this.initializeChart();
  }

  loadScpis() {
    this.comparatorService.getAllScpis().subscribe(data => {
      this.scpis = data;
    });
  }

  initializeChart() {
    this.chartData = {
      labels: Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
      datasets: []
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };
  }

  filterScpis(event: any, scpiTarget: 'filteredScpis1' | 'filteredScpis2' | 'filteredScpis3') {
    this[scpiTarget] = this.scpis.filter(scpi =>
      scpi.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  compareScpis() {
    const selectedScpis = [this.selectedScpi1, this.selectedScpi2, this.selectedScpi3].filter(scpi => scpi);

    if (this.investValue > 0 && selectedScpis.length > 0) {
      this.comparatorService.getScpiData(this.investValue, selectedScpis)
        .subscribe(response => {
          this.results = { scpi1: null, scpi2: null, scpi3: null };
          this.chartData.datasets = [];

          selectedScpis.forEach((scpi, index) => {
            const matchedScpi = response.find((resScpi: { name: any }) => resScpi.name === scpi);
            if (matchedScpi) {
              this.assignResults(matchedScpi);
              this.addDatasetToChart(matchedScpi, index);
              console.log(`Matched SCPI ${index}:`, matchedScpi);
            }
          });
          this.chartData = { ...this.chartData };
        });
    } else {
      console.warn('Veuillez sélectionner un montant et au moins une SCPI.');
    }
  }


  assignResults(matchedScpi: any) {
    if (this.selectedScpi1 === matchedScpi.name) {
      this.results.scpi1 = matchedScpi;
    } else if (this.selectedScpi2 === matchedScpi.name) {
      this.results.scpi2 = matchedScpi;
    } else if (this.selectedScpi3 === matchedScpi.name) {
      this.results.scpi3 = matchedScpi;
    }
  }


  addDatasetToChart(matchedScpi: any, index: number) {
    const yearlyData = Array.from({ length: 20 }, (_, i) => matchedScpi.monthlyRevenue * 12 * (i + 1));
    this.chartData.datasets.push({
      label: matchedScpi.name,
      data: yearlyData,
      fill: false,
      borderColor: this.scpiColors[index],
      tension: 0.4
    });
  }
}
