import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [FormsModule, InputSwitchModule,ButtonModule,RippleModule],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent {
  checked: boolean = false;
}
