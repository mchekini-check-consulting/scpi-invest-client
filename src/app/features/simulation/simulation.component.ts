import {Component} from '@angular/core';
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
    AddSimulationFormComponent
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent {
  title: string = "TITRE";
  scpi: ScpiModel | undefined;
  scpiDetail:ScpiDetailModel|undefined;
  stateOptions: any[] = [{ label: 'Non', value: false }, { label: 'Oui', value: true }];
  includeActualPort: boolean = false;
  EditDialogvisible: boolean = false;
  selectScpiDialogVisible: boolean = false;
  scpiSimulationFormDialogVisible: boolean = false;

  constructor(private scpiService:ScpiService) {
  }


  showEditDialog() {
    this.EditDialogvisible = true;
  }

  showScpiDialog(){
    this.selectScpiDialogVisible = true;
  }

  closeScpiFormDialog(isOpen:boolean){
    this.scpiSimulationFormDialogVisible =isOpen;
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

}
