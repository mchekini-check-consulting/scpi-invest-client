import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgClass} from "@angular/common";
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";

interface AnnuityData {
  year: number;
  annualIncome: number;
  capitalAmortization: number;
  loanInterest: number;
  monthlyPayment: number,
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
    NgClass
  ],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.css'
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

  ngOnInit() {
    this.calculateAnnuities();
  }

  calculateAnnuities() {
    this.annuityData = [];
    let remainingCapital = this.loanAmount - this.personalContribution;
    const annuity = (remainingCapital * (this.interestRate / 100)) /
      (1 - Math.pow(1 + (this.interestRate / 100), -this.loanDuration));

    for (let i = 1; i <= this.loanDuration; i++) {
      const loanInterest = -(remainingCapital * this.interestRate) / 100;
      const capitalAmortization = annuity + loanInterest;
      const annualIncome = (this.loanAmount * this.scpiYield) / 100;
      const monthlyPayment = - loanInterest + capitalAmortization;


      const frTaxRate = this.selectedTmi + 17.2;
      const euTaxRate = this.selectedTmi - this.customAverageRate;
      const euTax = this.selectedScpiType === 'Européenne' ? annualIncome * (euTaxRate / 100) : 0;
      const frTax = this.selectedScpiType === 'Française' ? annualIncome * (frTaxRate / 100) : 0;
      const tax = euTax + frTax;

      const savingEffort = (-loanInterest + capitalAmortization + euTax + frTax) - annualIncome;

      this.annuityData.push({
        year: 2024 + i - 1,
        annualIncome: (annualIncome / 12),
        capitalAmortization: capitalAmortization/12,
        loanInterest : loanInterest/ 12,
        monthlyPayment: monthlyPayment / 12,
        tax : tax / 12,
        savingEffort: savingEffort / 12
      });

      remainingCapital -= capitalAmortization;
    }
  }
}
