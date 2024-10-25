import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NgIf, NgStyle} from "@angular/common";
import {PlannedInvestementService} from "../../core/service/planned-investement.service";
import {ScpiInvestModel} from "../../core/model/scpi-invest.model";
import {InvestService} from "../../core/service/invest.service";
import {property_type} from "../../core/enum/property-type.enum";
import {PlannedInvestmentModel} from "../../core/model/planned-investment.model";
interface FrequanceVersement {
  name: String;
  type: FrequanceType
}

enum FrequanceType {
  TRIMESTRIELLE = "TRIMESTRIELLE",
  MENSUELLE = "MENSUELLE",
}

@Component({
  selector: 'app-versement',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    SliderModule,
    CheckboxModule,
    CalendarModule,
    DialogModule,
    ToastModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './planned-investment.component.html',
  styleUrl: './planned-investment.component.css',
  providers: [MessageService]
})
export class PlannedInvestmentComponent implements OnInit {

  scpi: ScpiModel[] | undefined;

  selectedScpi: ScpiModel | undefined;

  amount: number = 0;
  slidStep: number = 1;

  versementInitAmount: number = 0;
  versementMinimumAmount: number = 0;
  period: FrequanceVersement[] | undefined;
  selectedPeriod: FrequanceVersement | undefined;
  condition: boolean = false;
  displayRecap: boolean = false;
  listOfDay: string[] = [];
  selectedDay: string = "01";
  nombreShares: number = 0;


  plannedInvest: PlannedInvestmentModel | undefined;
  initialInvest: ScpiInvestModel | undefined;

  isCfrmBtnDesibled: boolean = true;

  constructor(private initialInvestement: InvestService, private plannedInvestementService: PlannedInvestementService, private scpiService: ScpiService, private messageService: MessageService) {


  }

  selecteScpi(selected: ScpiModel): void {
    this.selectedScpi = selected;
    this.versementInitAmount = selected.minimumSubscription
    this.versementMinimumAmount = selected.minimumSubscription;
    this.scpiService.getScpiById(this.selectedScpi.id).subscribe(data => {
      this.slidStep = Object.values(data.prices)[Object.values(data.prices).length - 1];
      this.amount = Object.values(data.prices)[Object.values(data.prices).length - 1];

    })
    this.scpiService.userScpiService().subscribe(data => {
      data.forEach((item) => {
        item.scpiId === selected.id ? this.versementMinimumAmount = 0 : null;
        item.scpiId === selected.id ? this.versementInitAmount = 0 : null;
      })
    })
  }


  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data => {
      this.scpi = data.sort((a, b) => a.name.localeCompare(b.name));
      this.selecteScpi(this.scpi[0]);

    });

    this.period = [
      {
        name: "Trimestrielle",
        type: FrequanceType.TRIMESTRIELLE
      },
      {
        name: "Mensuelle",
        type: FrequanceType.MENSUELLE
      },
    ];
    this.selectedPeriod = {
      name: "Mensuelle",
      type: FrequanceType.MENSUELLE
    };
    this.listOfDay = Array.from({length: 31}, (v, i) => (i + 1).toString().padStart(2, '0'));
  }


  showRecap() {
    if (this.selectedScpi && this.amount && this.selectedPeriod && this.selectedDay && this.condition) {
      this.nombreShares = this.versementInitAmount / this.slidStep;
      this.displayRecap = true;
      this.isCfrmBtnDesibled=false;
    } else {
      this.isCfrmBtnDesibled=true;
      this.messageService.add({
        severity: 'sucess',
        summary: 'Attention',
        detail: 'Veuillez remplir tous les champs obligatoirs.'
      })
    }
  }

  confirmSubmission() {
    this.displayRecap = false;
    this.plannedInvest = {
      frequency: this.selectedPeriod!.type,
      amount: this.amount,
      debitDayOfMonth: parseInt(this.selectedDay!),
      numberOfShares: this.amount/this.slidStep,
      scpi: this.selectedScpi?.id!
    }
    if (this.versementInitAmount > 0) {
      this.initialInvest={
        scpiId:this.selectedScpi!.id,
        propertyType: property_type.PLEINE_PROPRIETE,
        totalInvest: this.versementInitAmount,
        numberOfShares: this.nombreShares,
        partPrice:this.slidStep
      }
      this.createInitialInvestement();
      this.createPlannedInvestment();

    } else {
      this.createPlannedInvestment();
    }
  }

  cancelSubmission() {
    this.displayRecap = false;
  }

  createInitialInvestement() {
    this.initialInvestement.investInScpi(this.initialInvest!).subscribe(data => {
    })
  }

  createPlannedInvestment() {
    this.plannedInvestementService.createPlannedInvestment(this.plannedInvest!).subscribe(data => {
      this.messageService.add({
        severity: 'sucess',
        summary: 'Confirmation',
        detail: 'Confirmation de votre demande de versement programmé'
      })
    })
  }
  checkboxChange(value:boolean){
    this.condition=value;
    this.isCfrmBtnDesibled=!value;
  }
}
