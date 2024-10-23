import {Component, EventEmitter, Input, Output} from '@angular/core';
import {property_type, SimulatedScpiModel} from "../../../core/model/scpi-simulated.model";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-scpi-simulation',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    PanelModule,
    AvatarModule,
    Button,
    MenuModule,
    TableModule,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './scpi-simulation.component.html',
  styleUrl: './scpi-simulation.component.css'
})
export class ScpiSimulationComponent {

  @Input("simulatedScpi") simulatedScpi!: SimulatedScpiModel[];

  @Output("onClickOnDeleteEvent") onClickOnDeleteEvent = new EventEmitter<{id: number, type: property_type}>();
  @Output("onClickOnModifyEvent") onClickOnModifyEvent = new EventEmitter<{id: number, type: property_type}>();

  onClickDeleteScpi(id : number, type: property_type) {
    this.onClickOnDeleteEvent.emit({id, type});
  }

  onClickModifyScpi(id : number, type: property_type) {
    this.onClickOnModifyEvent.emit({id, type});
  }

  getTotalParts(): number {
    return this.simulatedScpi.reduce((sum, scpi) => sum + scpi.partNb, 0);
  }

  getTotalInvest(): number {
    return this.simulatedScpi.reduce((sum, scpi) => sum + scpi.totalInvest, 0);
  }

  getMonthlyIncomes() : number | undefined {
    let scpi = this.simulatedScpi.find(scpi => scpi.selectedProperty.type === property_type.PLEINE_PROPRIETE);
    if(scpi) {
      return scpi.monthlyIncomes;
    } else {
      return undefined;
    }
  }

  getLastDistributionRate() : string {
    let scpi = this.simulatedScpi.find(scpi => scpi.selectedProperty.type === property_type.PLEINE_PROPRIETE);
    if(scpi) {
      return scpi.lastYearDistributionRate + '%';
    }
    else {
      return '--';
    }
  }

  protected readonly property_type = property_type;
}
