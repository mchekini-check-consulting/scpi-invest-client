import { Component, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { FormsModule } from "@angular/forms";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import { CardModule } from "primeng/card";
import { ButtonDirective } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import {TabViewModule} from "primeng/tabview";
import {ChartModule} from "primeng/chart";
import {AvatarModule} from "primeng/avatar";

interface AnnuityData {
  year: number;
  annualIncome: number;
  capitalAmortization: number;
  loanInterest: number;
  monthlyPayment: number;
  tax: number;
  savingEffort: number;
}

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [
    TableModule,
    SliderModule,
    FormsModule,
    CurrencyPipe,
    CardModule,
    ButtonDirective,
    DropdownModule,
    InputNumberModule,
    NgClass,
    TabViewModule,
    ChartModule,
    AvatarModule,
    NgIf
  ],
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  loanAmount: number = 100000;
  personalContribution: number = 0;
  loanDuration: number = 20;
  interestRate: number = 5.0;
  scpiYield: number = 6.0;

  scpiTypes = [{ label: 'Européenne', value: 'Européenne' }, { label: 'Française', value: 'Française' }];
  selectedScpiType: string = 'Française';

  tmiOptions = [
    { label: '0%', value: 0 },
    { label: '11%', value: 11 },
    { label: '30%', value: 30 },
    { label: '41%', value: 41 },
    { label: '45%', value: 45 }
  ];
  selectedTmi: number = 0;
  customAverageRate: number = 0;

  annuityData: AnnuityData[] = [];
  totals = {
    annualIncome: 0,
    capitalAmortization: 0,
    loanInterest: 0,
    monthlyPayment: 0,
    tax: 0,
    savingEffort: 0
  };

  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.calculateAnnuities();
    this.initializeChartOptions();
  }

  initializeChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Années' }
        },
        y: {
          title: { display: true, text: 'Montants (EUR)' }
        }
      }
    };
  }

  calculateAnnuities() {
    this.annuityData = [];
    let remainingCapital = this.loanAmount - this.personalContribution;
    const annuity = (remainingCapital * (this.interestRate / 100)) /
      (1 - Math.pow(1 + (this.interestRate / 100), -this.loanDuration));

    const labels: string[] = [];
    const capitalData: number[] = [];
    const interestData: number[] = [];
    const monthlyPaymentData: number[] = [];

    for (let i = 1; i <= this.loanDuration; i++) {
      const loanInterest = -(remainingCapital * this.interestRate) / 100;
      const capitalAmortization = annuity + loanInterest;
      const annualIncome = (this.loanAmount * this.scpiYield) / 100;
      const monthlyPayment = -loanInterest + capitalAmortization;

      labels.push((2024 + i - 1).toString());
      capitalData.push(capitalAmortization / 12);
      interestData.push(- loanInterest / 12);
      monthlyPaymentData.push(monthlyPayment / 12);

      const frTaxRate = this.selectedTmi + 17.2;
      const euTaxRate = this.selectedTmi - this.customAverageRate;
      const euTax = this.selectedScpiType === 'Européenne' ? annualIncome * (euTaxRate / 100) : 0;
      const frTax = this.selectedScpiType === 'Française' ? annualIncome * (frTaxRate / 100) : 0;
      const tax = euTax + frTax;

      const savingEffort = (-loanInterest + capitalAmortization + euTax + frTax) - annualIncome;

      this.annuityData.push({
        year: 2024 + i - 1,
        annualIncome: annualIncome / 12,
        capitalAmortization: capitalAmortization / 12,
        loanInterest: loanInterest / 12,
        monthlyPayment: monthlyPayment / 12,
        tax: tax / 12,
        savingEffort: savingEffort / 12
      });

      remainingCapital -= capitalAmortization;
    }

    this.calculateTotals();
    this.chartData = {
      labels,
      datasets: [
        { label: 'Capital Remboursé', data: capitalData, borderColor: '#42A5F5', fill: false },
        { label: 'Intérêts', data: interestData, borderColor: '#FFA726', fill: false },
        { label: 'Mensualité', data: monthlyPaymentData, borderColor: '#66BB6A', fill: false }
      ]
    };
  }

  calculateTotals() {
    this.totals = {
      annualIncome: this.annuityData.reduce((sum, item) => sum + item.annualIncome, 0) * 12,
      capitalAmortization: this.annuityData.reduce((sum, item) => sum + item.capitalAmortization, 0) * 12,
      loanInterest: this.annuityData.reduce((sum, item) => sum + item.loanInterest, 0) * 12,
      monthlyPayment: this.annuityData.reduce((sum, item) => sum + item.monthlyPayment, 0) * 12,
      tax: this.annuityData.reduce((sum, item) => sum + item.tax, 0) * 12,
      savingEffort: this.annuityData.reduce((sum, item) => sum + item.savingEffort, 0) * 12
    };
  }
}
