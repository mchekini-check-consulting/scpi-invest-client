import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScpiModel} from "../../../core/model/scpi.model";
import {Scpi_itemComponent} from "../../scpi/components/scpi_item/scpi_item.component";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ScpiDetailModel} from "../../../core/model/scpi-detail.model";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";

interface Sector {
  name: string,
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


  sector!: Sector[];
  selectedSectors!: Sector[];
  totalInvest:number = 0;
  partNb:number = 0;

  ngOnInit(): void {
    this.sector = [
      {name: "Pleine propriété (Standard)"},
      {name: "Nue-propriété (avancée)"},
    ];

  }

  onCancelBtnClick() {
    this.onCloseForm.emit(false);
    this.totalInvest=0;
    this.partNb=0;
  }

  calculateRevenus(partNumber: number): string {
  let partPrice = Object.values(this.scpiDetails.prices)[Object.values(this.scpiDetails.prices).length - 1];

  let totalInvestissement = partPrice * partNumber;
  this.totalInvest = totalInvestissement;

  let revenusGeneres = totalInvestissement *
    Object.values(this.scpiDetails.distributionRate)[Object.values(this.scpiDetails.distributionRate).length - 1] / 100;

  return (revenusGeneres / 12).toFixed(2);
  }
}
