import { Component, OnInit} from '@angular/core';
import { ToggleButtonModule } from "primeng/togglebutton";
import { FormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from '@angular/common';
import {ScpiComponent} from "../scpi/scpi.component";
import {ScpiModel} from "../../core/model/scpi.model";
import {AddSimulationFormComponent} from "./add-simulation-form/add-simulation-form.component";
import {ScpiDetailModel} from "../../core/model/scpi-detail.model";
import {ScpiService} from "../../core/service/scpi.service";
import {SimulatedScpiModel} from "../../core/model/scpi-simulated.model";
import {ScpiSimulationComponent} from "./scpi-simulation/scpi-simulation.component";
import {ChartModule} from "primeng/chart";
import {ScpiDetailComponent} from "../scpi/components/scpi-detail/scpi-detail.component";
import {ScpiDetailSimulationComponent} from "./scpi-simulation/scpi-detail-simulation/scpi-detail-simulation.component";

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    ToggleButtonModule,
    FormsModule,
    SelectButtonModule,
    Button,
    DialogModule,
    InputTextModule,
    CommonModule,
    ScpiComponent,
    AddSimulationFormComponent,
    ScpiSimulationComponent,
    ChartModule,
    ScpiDetailComponent,
    ScpiDetailSimulationComponent
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements OnInit{

  title: string = "TITRE";
  scpi: ScpiModel | undefined;
  scpiDetail:ScpiDetailModel|undefined;
  includeActualPort: boolean = false;
  EditDialogvisible: boolean = false;
  selectScpiDialogVisible: boolean = false;
  scpiSimulationFormDialogVisible: boolean = false;
  simulatedScpiList!: SimulatedScpiModel[][];


  constructor(private scpiService:ScpiService) {
  }

  ngOnInit(): void {
    this.simulatedScpiList = [];
  }


  showEditDialog() {
    this.EditDialogvisible = true;
  }

  showScpiDialog(){
    this.selectScpiDialogVisible = true;
  }

  closeScpiFormDialog(isOpen:boolean){
    this.scpiSimulationFormDialogVisible = isOpen;
    // this.selectScpiDialogVisible = false;
  }

  editTitle(event: Event) {
    const inputElement = (event.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
    this.title = inputElement.value;
    this.EditDialogvisible = false;
  }

  openAddDialogForm(scpi:ScpiModel){
    this.scpi=scpi;
    this.selectScpiDialogVisible = false;
    this.scpiSimulationFormDialogVisible =true;
    this.getSpicDetail(scpi.id);

  }

  getSpicDetail(scpiId:number):void{
    this.scpiService.getScpiById(scpiId).subscribe(
      data =>{
        this.scpiDetail=data;
      }
    )
  }


  addSimulatedScpi(simulatedScpi: SimulatedScpiModel) {
    this.scpiSimulationFormDialogVisible = false;
    this.selectScpiDialogVisible = false;

    const index = this.simulatedScpiList.findIndex(scpiList =>
      scpiList.some(scpi => scpi.scpi_id === simulatedScpi.scpi_id)
    );

    if (index === -1) {
      console.log(this.simulatedScpiList);
      this.simulatedScpiList.push([{ ...simulatedScpi }]);

    } else {
      const existingScpiIndex = this.simulatedScpiList[index].findIndex(scpi =>
        scpi.selectedProperty.propertyLabel === simulatedScpi.selectedProperty.propertyLabel
      );


      if (existingScpiIndex === -1) {
        this.simulatedScpiList[index].push({ ...simulatedScpi });

      } else {
        const existingScpi = this.simulatedScpiList[index][existingScpiIndex];
        this.simulatedScpiList[index][existingScpiIndex] = {
          ...existingScpi,
          totalInvest: existingScpi.totalInvest + simulatedScpi.totalInvest,
          partNb: existingScpi.partNb + simulatedScpi.partNb,
          monthlyIncomes: existingScpi.monthlyIncomes + simulatedScpi.monthlyIncomes
        };
      }
    }
  }
}
