import {Component, Input, OnInit} from '@angular/core';
import {SimulatedScpiModel} from "../../../core/model/scpi-simulated.model";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-scpi-simulation',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    PanelModule,
    AvatarModule,
    Button,
    MenuModule
  ],
  templateUrl: './scpi-simulation.component.html',
  styleUrl: './scpi-simulation.component.css'
})
export class ScpiSimulationComponent  implements OnInit{

  @Input() simulatedScpi!: SimulatedScpiModel;
  items: any;

   ngOnInit() {

     this.items = [
       {
         label: 'Refresh',
         icon: 'pi pi-refresh'
       },
       {
         label: 'Search',
         icon: 'pi pi-search'
       },
       {
         separator: true
       },
       {
         label: 'Delete',
         icon: 'pi pi-times'
       }
     ];
   }

}
