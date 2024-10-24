import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {SliderModule} from "primeng/slider";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NgIf} from "@angular/common";

interface FrequanceVersement{
  name:String;
  type:FrequanceType
}

enum FrequanceType{
  TRIMESTRIELLE,
  MENSUELLE,
}
@Component({
  selector: 'app-versement',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    SliderModule,
    CheckboxModule,
    CalendarModule,
    DialogModule,
    ToastModule,
    NgIf
  ],
  templateUrl: './versement.component.html',
  styleUrl: './versement.component.css',
  providers:[MessageService]
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
  displayRecap : boolean = false;
  listOfDay:string[]=[];
  selectedDay:string="01";
  nombreShares : number = 0;
  ifFirstInvestment:boolean=true;

  constructor(private scpiService:ScpiService,private messageService: MessageService) {


  }

  selecteScpi(selected:ScpiModel):void{
    this.selectedScpi = selected;
    this.versementInitAmount= selected.minimumSubscription
    this.versementMinimumAmount = selected.minimumSubscription;
    this.scpiService.getScpiById(this.selectedScpi.id).subscribe(data=>{
      this.slidStep=Object.values(data.prices)[Object.values(data.prices).length-1];
      this.amount = Object.values(data.prices)[Object.values(data.prices).length-1];

    })
    this.scpiService.userScpiService().subscribe(data=>{
      data.forEach((item)=>{
        item.scpiId === selected.id?this.versementMinimumAmount=0:null;
        item.scpiId === selected.id?this.versementInitAmount=0:null;
      })
    })
  }


  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data=>{
      this.scpi = data.sort((a, b) => a.name.localeCompare(b.name));
      this.selectedScpi=this.scpi[0];
    });

    this.period=[
      {
        name:"Trimestrielle",
        type:FrequanceType.TRIMESTRIELLE
      },
      {
        name:"Mensuelle",
        type:FrequanceType.MENSUELLE
      },
    ];
    this.selectedPeriod = {
      name:"Mensuelle",
      type:FrequanceType.MENSUELLE
    };
    this.listOfDay= Array.from({ length: 31 }, (v, i) => (i + 1).toString().padStart(2, '0'));
  }


  showRecap(){
    if(this.selectedScpi && this.amount &&  this.selectedPeriod && this.selectedDay && this.condition){
      this.nombreShares = this.versementInitAmount/this.slidStep;
      this.displayRecap = true;
    }else{
      this.messageService.add({severity:'sucess',summary:'Attention',detail:'Veuillez remplir tous les champs obligatoirs.'})
    }
  }

  confirmSubmission(){
    this.displayRecap = false;
    this.messageService.add({severity:'sucess',summary:'Confirmation',detail:'Confirmation de votre demande de versement programmé'})
  }

  cancelSubmission(){
    this.displayRecap = false;
  }

}
