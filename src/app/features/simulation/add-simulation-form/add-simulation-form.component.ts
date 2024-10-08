import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scpi_itemComponent} from "../../scpi/components/scpi_item/scpi_item.component";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ScpiDetailModel} from "../../../core/model/scpi-detail.model";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ScpiModel} from "../../../core/model/scpi.model";


enum property_type {
  PLEINE_PROPRIETE,
  NUE_PROPRIETE
}
interface Property {
  type: property_type;
  propertyLabel: string;
}

interface Stripping {
  time: number;
  percent : number;
  stipLabel : string;
}

interface SimulatedScpi {
  selectedProperty: Property;
  totalInvest: number;
  partNb: number;
  monthlyIncomes: number;
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
export class AddSimulationFormComponent implements OnInit {
  @Input() scpiDetails!:ScpiDetailModel;
  @Input() scpi!:ScpiModel;
  @Output("onCloseForm") onCloseForm = new EventEmitter<boolean>();
  // @Output("onAddScpi") onAddScpi = new EventEmitter<ScpiDetailModel>();

  protected readonly property_type = property_type;

  // Sector
  properties!: Property[];
  simulatedScpi!: SimulatedScpi;

  // Delay
  selectedStrip!: Stripping;
  stripping!: Stripping[];

  ngOnInit(): void {

    this.properties = [
      {propertyLabel: "Pleine propriété (Standard)", type: property_type.PLEINE_PROPRIETE},
      {propertyLabel: "Nue-propriété (avancée)", type: property_type.NUE_PROPRIETE},
    ];

    this.stripping = [
      {time: 5, percent : 80},
      {time: 6, percent : 77},
      {time: 7, percent : 74},
      {time: 8, percent : 71},
      {time: 9, percent : 69},
      {time: 10, percent : 67}
    ].map(option => ({
      ...option,
      stipLabel : `${option.time} ans - ${option.percent}%`
    }));

    this.selectedStrip = this.stripping[0];


    this.simulatedScpi = {
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0
    };
  }

  onCancelBtnClick() {
    this.onCloseForm.emit(false);
    this.simulatedScpi.totalInvest = 0;
    this.simulatedScpi.partNb = 1;
    this.simulatedScpi.selectedProperty = this.properties[0];
    this.selectedStrip = this.stripping[0];
  }

  calculateRevenus(partNumber: number): number {
  let partPrice = Object.values(this.scpiDetails.prices)[Object.values(this.scpiDetails.prices).length - 1];

  // part
  let percentagePart = 1
  if(this.simulatedScpi.selectedProperty.type === property_type.NUE_PROPRIETE)
  {
    percentagePart = this.selectedStrip.percent / 100;
  }

  this.simulatedScpi.totalInvest = partPrice * partNumber * percentagePart;

    let revenusGeneres = this.simulatedScpi.totalInvest *
    Object.values(this.scpiDetails.distributionRate)[Object.values(this.scpiDetails.distributionRate).length - 1] / 100;

    this.simulatedScpi.monthlyIncomes = Number((revenusGeneres / 12).toFixed(2));

    return this.simulatedScpi.monthlyIncomes;
  }

  onAddSimulatedScpi() {
    console.log(this.simulatedScpi);
  }
}
