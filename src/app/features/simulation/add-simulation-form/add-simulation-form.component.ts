import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Scpi_itemComponent} from "../../scpi/components/scpi_item/scpi_item.component";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ScpiDetailModel} from "../../../core/model/scpi-detail.model";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ScpiModel} from "../../../core/model/scpi.model";
import {Property, property_type, SimulatedScpiModel} from "../../../core/model/scpi-simulated.model";


interface Stripping {
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
    DropdownModule
  ],
  templateUrl: './add-simulation-form.component.html',
  styleUrl: './add-simulation-form.component.css'
})
export class AddSimulationFormComponent implements OnInit, OnChanges {
  @Input() scpiDetails!:ScpiDetailModel;
  @Input() scpi!:ScpiModel;
  @Input() formModification!: boolean;
  @Input("investmentToModify") investmentToModify!: SimulatedScpiModel;

  @Output("onCloseForm") onCloseForm = new EventEmitter<boolean>();
  @Output("onAddScpi") onAddScpi = new EventEmitter<SimulatedScpiModel>();
  @Output("onModifyScpi") onModifyScpi = new EventEmitter<{oldInvestment: SimulatedScpiModel, newInvestment: SimulatedScpiModel}>();


  // Sector
  properties!: Property[];
  simulatedScpi!: SimulatedScpiModel;

  // Delay
  selectedStrip!: Stripping;
  stripping!: Stripping[];

  ngOnChanges(changes: SimpleChanges) {
    if(changes["investmentToModify"]) {
      this.simulatedScpi = {...this.investmentToModify};
    }
  }

  ngOnInit(): void {

    this.properties = [
      {propertyLabel: "Pleine propriété (Standard)", type: property_type.PLEINE_PROPRIETE},
      {propertyLabel: "Nue-propriété (avancée)", type: property_type.NUE_PROPRIETE},
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
      scpi_id : -1,
      name : '',
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0,
      withdrawalValue : 0
    };
  }

  onCancelBtnClick() {
    this.onCloseForm.emit(false);
    this.simulatedScpi.totalInvest = 0;
    this.simulatedScpi.partNb = 1;
    this.simulatedScpi.selectedProperty = this.properties[0];
    this.selectedStrip = this.stripping[0];
  }

  calculateRevenus(partNumber: number): string {
  let partPrice = Object.values(this.scpiDetails.prices)[Object.values(this.scpiDetails.prices).length - 1];

  // part
  let percentagePart = 1
  if(this.simulatedScpi.selectedProperty.type === property_type.NUE_PROPRIETE)
  {
    percentagePart = this.selectedStrip.percent / 100;
  }
  this.simulatedScpi.totalInvest = partPrice * partNumber * percentagePart;
  this.simulatedScpi.withdrawalValue = this.simulatedScpi.totalInvest * ((100 - this.scpiDetails.subscriptionFees)/ 100);

    if(this.simulatedScpi.selectedProperty.type === property_type.PLEINE_PROPRIETE)
    {
      let revenusGeneres = this.simulatedScpi.totalInvest * Object.values(this.scpiDetails.distributionRate)[Object.values(this.scpiDetails.distributionRate).length - 1] / 100;
      this.simulatedScpi.monthlyIncomes = Number((revenusGeneres / 12).toFixed(2));
      return this.simulatedScpi.monthlyIncomes + '€/mois';
    } else {
      return '--';
    }
  }

  onClickAddInvestment() {
    this.simulatedScpi.scpi_id = this.scpiDetails.id;
    this.simulatedScpi.name = this.scpi.name;

    if(this.formModification === false) {
      this.onAddScpi.emit(this.simulatedScpi);
    } else {
      this.onModifyScpi.emit({
        oldInvestment : this.investmentToModify,
        newInvestment: this.simulatedScpi
      });
    }

    this.simulatedScpi = {
      scpi_id : -1,
      name : '',
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0,
      withdrawalValue : 0
    };
  }

  protected readonly property_type = property_type;
}
