import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";

interface FrequanceVersement{
  name:String;
  type:FrequanceType
}

enum FrequanceType{
  Trimestrielle,
  Mensuelle,
}
@Component({
  selector: 'app-versement',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    SliderModule,
    CheckboxModule,
    CalendarModule
  ],
  templateUrl: './versement.component.html',
  styleUrl: './versement.component.css'
})
export class VersementComponent implements OnInit{

  scpi: ScpiModel[] | undefined;

  selectedScpi: ScpiModel | undefined;

  amount: number=0;
  slidStep:number=1;

  versementInitAmount: number=0;
  versementMinimumAmount:number=0;
  period:FrequanceVersement[]|undefined;
  selectedPeriod:FrequanceVersement|undefined;
  condition:boolean=false;

  listOfDay:string[]=[];
  selectedDay:string="01";

  constructor(private scpiService:ScpiService ) {


  }

  selecteScpi(selected:ScpiModel):void{
    this.selectedScpi = selected;
    this.versementInitAmount= selected.minimumSubscription
    this.versementMinimumAmount = selected.minimumSubscription;
    this.scpiService.getScpiById(this.selectedScpi.id).subscribe(data=>{
      this.slidStep=Object.values(data.prices)[Object.values(data.prices).length-1];
      this.amount = Object.values(data.prices)[Object.values(data.prices).length-1];

    })
  }


  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data=>{
      this.scpi = data.sort((a, b) => a.name.localeCompare(b.name));
      this.selectedScpi=this.scpi[0];
    });

    this.period=[
      {
        name:"Trimestre",
        type:FrequanceType.Trimestrielle
      },
      {
        name:"Mensuel",
        type:FrequanceType.Mensuelle
      },
    ];

    this.listOfDay= Array.from({ length: 31 }, (v, i) => (i + 1).toString().padStart(2, '0'));
  }

}
