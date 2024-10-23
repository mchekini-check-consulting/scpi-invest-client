import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {DecimalPipe, NgClass, NgForOf, NgStyle} from "@angular/common";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-scpi-performance-simulation',
  standalone: true,
  imports: [
    TabViewModule,
    NgForOf,
    ChartModule,
    DecimalPipe,
    NgClass,
    NgStyle
  ],
  templateUrl: './scpi-performance-simulation.component.html',
  styleUrl: './scpi-performance-simulation.component.css'
})
export class ScpiPerformanceSimulationComponent  implements OnInit, OnChanges {

  @Input("perfomanceCharts") perfomanceCharts!: Map<number,{accumulatedInvestment: number ,accumulatedIncomes : number}>;
  @Input("futureIncomesEveryFiveYears") futureIncomesEveryFiveYears!: Map<number,{incomes: number ,revaluation : number, total: number}>;

  data: any;
  options: any;

  years = [5, 10, 15, 20, 25];
  ngOnInit() {
    this.setPerformanceCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['perfomanceCharts']) {
      this.setPerformanceCharts();
    }
  }

  setPerformanceCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    let timeLabel = Array.from(this.perfomanceCharts.keys()).map(key => key);
    let performanceLabel = Array.from(this.perfomanceCharts.values());
    let accumulatedInvestmentList = performanceLabel.map(value => value.accumulatedInvestment);
    let accumulatedIncomesList = performanceLabel.map(value => value.accumulatedIncomes);

    this.data = {
      labels: timeLabel,
      datasets: [
        {
          type: 'bar',
          label: 'Valeur totale',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: accumulatedInvestmentList
        },
        {
          type: 'bar',
          label: 'Revenus bruts cumulés',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: accumulatedIncomesList
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
            callback: function(value: any) {
              value++;
              if (value === 1) return value + ' an';
              else return value + ' ans';
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
            callback: function(value: any) {
              return value + ' €';
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }



}
