import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Scpi_itemComponent} from "../../scpi/components/scpi_item/scpi_item.component";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ScpiDetailModel} from "../../../core/model/scpi-detail.model";
import {DecimalPipe, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ScpiModel} from "../../../core/model/scpi.model";
import {Property, SimulatedScpiModel} from "../../../core/model/scpi-simulated.model";
import {property_type} from "../../../core/enum/property-type.enum";
import {ScpiInvestModel} from "../../../core/model/scpi-invest.model";


export interface Stripping {
  time: number;
  percent : number;
  stipLabel : string;
}

@Component({
  selector: 'app-add-simulation-form',
  standalone: true,
  imports: [
    Scpi_itemComponent,
    MultiSelectModule,
    FormsModule,
    InputNumberModule,
    NgIf,
    DropdownModule,
    DecimalPipe
  ],
  templateUrl: './add-simulation-form.component.html',
  styleUrl: './add-simulation-form.component.css'
})
export class AddSimulationFormComponent implements OnInit, OnChanges {
  @Input("scpiDetails") scpiDetails!:ScpiDetailModel;
  @Input() scpi!:ScpiModel;
  @Input() formModification!: boolean;
  @Input() fromInvest: boolean=false;
  @Input("investmentToModify") investmentToModify!: SimulatedScpiModel;

  @Output("onCloseForm") onCloseForm = new EventEmitter<boolean>();
  @Output("onAddScpi") onAddScpi = new EventEmitter<SimulatedScpiModel>();
  @Output("onModifyScpi") onModifyScpi = new EventEmitter<{oldInvestment: SimulatedScpiModel, newInvestment: SimulatedScpiModel}>();
  @Output("onInvest") onInvest = new EventEmitter<ScpiInvestModel>();

  // Sector
  properties!: Property[];
  simulatedScpi!: SimulatedScpiModel;

  // Delay
  selectedStrip!: Stripping;
  stripping!: Stripping[];

  minimiumSubscriptionPart: number=0;


  ngOnChanges(changes: SimpleChanges) {
    if(changes["investmentToModify"]) {
      this.simulatedScpi = {...this.investmentToModify};
    }

    if(changes["scpiDetails"]) {
      this.minimumPart();
      this.calculateRevenus();
    }
  }

  ngOnInit(): void {

    this.properties = [
      {propertyLabel: "Pleine propriété (Standard)", type: property_type.PLEINE_PROPRIETE},
      {propertyLabel: "Nue-propriété (avancée)", type: property_type.NUE_PROPRIETE},
      {propertyLabel:"Usufruit",type:property_type.USUFRUIT},
    ];

    this.stripping = [
      {time : 3, percent: 90, stipLabel: '3 ans - 90%'},
      {time : 4, percent: 85, stipLabel: '4 ans - 85%'},
      {time : 5, percent: 80, stipLabel: '5 ans - 80%'},
      {time : 7, percent: 75, stipLabel: '7 ans - 75%'},
      {time : 10, percent: 70, stipLabel: '10 ans - 70%'},
      {time : 12, percent: 65, stipLabel: '12 ans - 65%'},
      {time : 15, percent: 60, stipLabel: '15 ans - 60%'},
      {time : 20, percent: 55, stipLabel: '20 ans - 55%'},
    ]

    this.selectedStrip = this.stripping[0];

    this.simulatedScpi = {
      scpiId : -1,
      name : '',
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0,
      lastYearDistributionRate : '',
      withdrawalValue : 0,
      strip:  {time : 0, percent: 100, stipLabel: ''},
      localizations: {},
      sectors: {},
      cashback: 0,
      simulated: true
    };
  }

  onCancelBtnClick() {
    this.onCloseForm.emit(false);
    this.simulatedScpi.totalInvest = 0;
    this.simulatedScpi.partNb = 1;
    this.simulatedScpi.selectedProperty = this.properties[0];
    this.selectedStrip = this.stripping[0];
  }

  calculateRevenus(): number {

  let partPrice = Object.values(this.scpiDetails.prices)[Object.values(this.scpiDetails.prices).length - 1];
  let lastDistributionRateInPercent = Number(this.scpi.lastYearDistributionRate) / 100;

  // part
  let percentagePart = 1
  if(this.simulatedScpi.selectedProperty.type === property_type.NUE_PROPRIETE)
  {
    percentagePart = this.selectedStrip.percent / 100;
  }
  else if (this.simulatedScpi.selectedProperty.type === property_type.USUFRUIT) {
    percentagePart = 1 - (this.selectedStrip.percent / 100);
  }

  this.simulatedScpi.monthlyIncomes = partPrice * this.simulatedScpi.partNb * lastDistributionRateInPercent / 12;
  this.simulatedScpi.totalInvest = partPrice * this.simulatedScpi.partNb * percentagePart;
  this.simulatedScpi.withdrawalValue = this.simulatedScpi.totalInvest * ((100 - this.scpiDetails.subscriptionFees)/ 100);
  this.simulatedScpi.cashback = partPrice * this.simulatedScpi.partNb * this.scpiDetails.cashback / 100 ;
  return this.simulatedScpi.monthlyIncomes;

  }

  onClickAddInvestment() {
    this.simulatedScpi.scpiId = this.scpiDetails.id;
    this.simulatedScpi.name = this.scpi.name;
    this.simulatedScpi.lastYearDistributionRate = this.scpi.lastYearDistributionRate;
    this.simulatedScpi.localizations = this.scpiDetails.localizations;
    this.simulatedScpi.sectors = this.scpiDetails.sectors;
    this.simulatedScpi.cashback = this.scpiDetails.cashback;
    this.simulatedScpi.simulated = true;

    if(this.simulatedScpi.selectedProperty.type === property_type.NUE_PROPRIETE) {
      this.simulatedScpi.strip = this.selectedStrip;
    }

    if(this.formModification === false) {
      this.onAddScpi.emit(this.simulatedScpi);
    } else {
      this.onModifyScpi.emit({
        oldInvestment : this.investmentToModify,
        newInvestment: this.simulatedScpi
      });
    }

    this.simulatedScpi = {
      scpiId : -1,
      name : '',
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0,
      withdrawalValue : 0,
      lastYearDistributionRate : '',
      strip:  {time : 0, percent: 100, stipLabel: ''},
      localizations: {},
      sectors: {},
      cashback: 0,
      simulated: true
    };
  }
  onAddSimulatedScpi() {
    if(!this.fromInvest){
      this.simulatedScpi.scpiId = this.scpiDetails.id;
      this.simulatedScpi.name = this.scpi.name;
      this.simulatedScpi.withdrawalValue = Object.values(this.scpiDetails.reconstitutionValue)[Object.values(
        this.scpiDetails.reconstitutionValue
      ).length - 1];

      this.onAddScpi.emit(this.simulatedScpi);
    }else{
      let scpiInvestIn:ScpiInvestModel;
      scpiInvestIn = {
        scpiId:this.scpi.id,
        propertyType: this.simulatedScpi.selectedProperty.type,
        totalInvest: this.simulatedScpi.totalInvest,
        numberOfShares: this.simulatedScpi.partNb,
        stripping:this.selectedStrip.time
      }
      this.onInvest.emit(scpiInvestIn);
   }
  }

  minimumPart():void{
    this.minimiumSubscriptionPart = this.scpiDetails.minimumSubscription/Object.values(this.scpiDetails.prices)[Object.values(this.scpiDetails.prices).length - 1];
    this.simulatedScpi.partNb= this.minimiumSubscriptionPart;
  }

  protected readonly property_type = property_type;
}
