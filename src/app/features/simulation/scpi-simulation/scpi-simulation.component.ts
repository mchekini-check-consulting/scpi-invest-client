import {Component, Input} from '@angular/core';
import {property_type, SimulatedScpiModel} from "../../../core/model/scpi-simulated.model";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {NgIf} from "@angular/common";


interface ProductModel {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}
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
    NgIf
  ],
  templateUrl: './scpi-simulation.component.html',
  styleUrl: './scpi-simulation.component.css'
})
export class ScpiSimulationComponent {

  @Input() simulatedScpi!: SimulatedScpiModel[];

  protected readonly property_type = property_type;
}
