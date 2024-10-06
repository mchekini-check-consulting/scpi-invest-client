import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule , FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//...

@Component({
 
  selector: 'app-simulation',
  standalone: true,
  imports: [FormsModule, InputSwitchModule,ButtonModule,RippleModule,SelectButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent {
  formGroup!: FormGroup;

    stateOptions: any[] = [
        { label: 'non', value: 'non' },
        { label: 'oui', value: 'oui' }
    ];

 
  
    constructor(private router: Router) { }
    ngOnInit() {
        this.formGroup = new FormGroup({
            value: new FormControl('oui')
        });
    }


    title: string = 'TITRE';
    isEditing: boolean = false;
  
    editTitle() {
      this.isEditing = true; // Active le mode édition
    }
  
    saveTitle() {
      this.isEditing = false; // Désactive le mode édition
    }
    AjoutSCPI(){
      console.log('nav')
    //  this.router.navigate('/scpi');
       this.router.navigateByUrl('/scpi');
    }
}
