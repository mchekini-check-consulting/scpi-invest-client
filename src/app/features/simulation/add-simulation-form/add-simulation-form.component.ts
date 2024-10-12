import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class AddSimulationFormComponent implements OnInit {
  @Input() scpiDetails!:ScpiDetailModel;
  @Input() scpi!:ScpiModel;
  @Output("onCloseForm") onCloseForm = new EventEmitter<boolean>();
  @Output("onAddScpi") onAddScpi = new EventEmitter<SimulatedScpiModel>();

  // Sector
  properties!: Property[];
  simulatedScpi!: SimulatedScpiModel;

  // Delay
  selectedStrip!: Stripping;
  stripping!: Stripping[];

  ngOnInit(): void {

    this.properties = [
      {propertyLabel: "Pleine propriété (Standard)", type: property_type.PLEINE_PROPRIETE},
      {propertyLabel: "Nue-propriété (avancée)", type: property_type.NUE_PROPRIETE},
    ];

    this.stripping = Array.from({ length: 18 }, (_, i) => ({
      time: i + 3,
      percent: 100 - (i + 3) * 2, // Ce pourcentage n'a pas été donné par le PO, donc je l'ajoute moi-même le minimum c'est 60 le résultat du calcule n'est pas correcte
      stipLabel: `${i + 3} ans`
    }));


    this.selectedStrip = this.stripping[0];


    this.simulatedScpi = {
      scpi_id : -1,
      name : '',
      selectedProperty: this.properties[0],
      totalInvest : 0,
      partNb: 1,
      monthlyIncomes : 0,
      reconstitutionValue : 0
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
    this.simulatedScpi.scpi_id = this.scpiDetails.id;
    this.simulatedScpi.name = this.scpi.name;
    this.simulatedScpi.reconstitutionValue = Object.values(this.scpiDetails.reconstitutionValue)[Object.values(
      this.scpiDetails.reconstitutionValue
    ).length - 1];

    this.onAddScpi.emit(this.simulatedScpi);
  }

  protected readonly property_type = property_type;
}
