import {Component, OnInit} from '@angular/core';
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
    ChartModule
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements OnInit{

  title: string = "TITRE";
  scpi: ScpiModel | undefined;
  scpiDetail:ScpiDetailModel|undefined;
  stateOptions: any[] = [{ label: 'Non', value: false }, { label: 'Oui', value: true }];
  includeActualPort: boolean = false;
  EditDialogvisible: boolean = false;
  selectScpiDialogVisible: boolean = false;
  scpiSimulationFormDialogVisible: boolean = false;
  simulatedScpiList!: SimulatedScpiModel[][];
  data: any;
  options: any;

  constructor(private scpiService:ScpiService) {
  }

  ngOnInit(): void {
    this.simulatedScpiList = [];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }


  showEditDialog() {
    this.EditDialogvisible = true;
  }

  showScpiDialog(){
    this.selectScpiDialogVisible = true;
  }

  closeScpiFormDialog(isOpen:boolean){
    this.scpiSimulationFormDialogVisible = isOpen;
    this.selectScpiDialogVisible = true;
  }

  editTitle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.title = inputElement.value;
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
