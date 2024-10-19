import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MegaMenuItem, MessageService} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {Scpi_itemComponent} from "./components/scpi_item/scpi_item.component";
import {Router} from "@angular/router";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MegaMenuModule} from "primeng/megamenu";
import {MultiSelectModule} from "primeng/multiselect";
import {SliderModule} from "primeng/slider";
import {DialogModule} from "primeng/dialog";
import {AddSimulationFormComponent} from "../simulation/add-simulation-form/add-simulation-form.component";
import {InvestService} from "../../core/service/invest.service";
import {ScpiDetailModel} from "../../core/model/scpi-detail.model";
import {property_type, SimulatedScpiModel} from "../../core/model/scpi-simulated.model";
import {ScpiInvestModel} from "../../core/model/scpi-invest.model";
import {StepperModule} from "primeng/stepper";
import {PaymentInfoModel} from "../../core/model/payment_info.model";
import {UserService} from "../../core/service/user.service";



interface Region {
  name: string,
  code: string
}
interface Sector {
  name: string,
}

interface Montant {
  amount:number
}
@Component({
  selector: 'app-scpi',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    Scpi_itemComponent,
    Button,
    InputTextModule,
    MegaMenuModule,
    MultiSelectModule,
    SliderModule,
    DialogModule,
    AddSimulationFormComponent,
    StepperModule,
  ],
  providers: [MessageService, OAuthService],
  templateUrl: './scpi.component.html',
  styleUrl: './scpi.component.css'
})
export class ScpiComponent implements OnInit{
  scpiListData : ScpiModel[] | undefined;
  items: MegaMenuItem[] | undefined;

  regions!: Region[];
  sector!: Sector[];
  montant!: Montant;
  value: number = 50000;

  selectedScpi?:ScpiModel;
  scpiDetails?:ScpiDetailModel;

  selectedRegions!: Region[];
  showFormDialog: boolean = false;

  bankInformation?:PaymentInfoModel;
  username?:String;
  email?:String;

  @Input() fromWhere:string="invest";
  @Output("OnAddBtnClick") onAddBtnClick = new EventEmitter<ScpiModel>();
  constructor(private scpiService:ScpiService, private router: Router, private investService: InvestService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      if (user != null)
        this.username = user.firstName + " " + user.lastName ;
        this.email = user?.email;
    });
  }



  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data =>{
      this.scpiListData = data;
      this.scpiListData.forEach((scpi)=> scpi.image=this.randomImage())
    });
    this.setSearchCriteriaValue()
  }

  getScpiDetail(scpi_id:number): void{
    this.scpiService.getScpiById(scpi_id).subscribe(data=>{
      this.scpiDetails = data;
    })
  }


  showScpiDetail(id: number) {
    this.router.navigateByUrl("scpi/" + id);

  }
  closeScpiFormDialog(isOpen:boolean,prevCallback?:{ emit: () => void }){
    this.showFormDialog = isOpen;
    this.bankInformation =undefined;
    if(prevCallback!=null){
      prevCallback.emit();
    }
  }


  confirmInevst(invest:ScpiInvestModel,nextCallback: { emit: () => void }):void{
    if (invest.propertyType === property_type.PLEINE_PROPRIETE.toString()) {
      invest.stripping = null;
    }
    this.investService.investInScpi(invest).subscribe(data => {
      this.bankInformation=data;
      nextCallback.emit()
    })
  }

  investirFunction(scpi:ScpiModel) {
    if(this.fromWhere ==="simulation"){
      this.onAddBtnClick.emit(scpi);
    }
    else if(this.fromWhere == "invest"){
      this.selectedScpi = scpi;
      this.getScpiDetail(scpi.id)
      this.showFormDialog=true;
    }
  }


  randomImage():String{
    return(Math.floor(Math.random() * 10) + 1).toString();
  }


  setSearchCriteriaValue() {
    this.montant = {amount:300};
    this.sector = [
      {name: "Résidentiel"},
      {name: "Bureaux"},
      {name: "Hôtels"},
      {name: "Commerces"},
      {name: "Logistique"},
      {name: "Santé"},
      {name: "Locaux d’activité"},
      {name: "Transport"},
      {name: "Autres"}
    ];

    this.regions = [
      {name: 'Autriche', code: 'AT'},
      {name: 'Belgique', code: 'BE'},
      {name: 'Bulgarie', code: 'BG'},
      {name: 'Chypre', code: 'CY'},
      {name: 'Croatie', code: 'HR'},
      {name: 'Danemark', code: 'DK'},
      {name: 'Espagne', code: 'ES'},
      {name: 'Estonie', code: 'EE'},
      {name: 'Finlande', code: 'FI'},
      {name: 'France', code: 'FR'},
      {name: 'Grèce', code: 'GR'},
      {name: 'Hongrie', code: 'HU'},
      {name: 'Irlande', code: 'IE'},
      {name: 'Italie', code: 'IT'},
      {name: 'Lettonie', code: 'LV'},
      {name: 'Lituanie', code: 'LT'},
      {name: 'Luxembourg', code: 'LU'},
      {name: 'Malte', code: 'MT'},
      {name: 'Pays-Bas', code: 'NL'},
      {name: 'Pologne', code: 'PL'},
      {name: 'Portugal', code: 'PT'},
      {name: 'République tchèque', code: 'CZ'},
      {name: 'Roumanie', code: 'RO'},
      {name: 'Slovaquie', code: 'SK'},
      {name: 'Slovénie', code: 'SI'},
      {name: 'Suède', code: 'SE'}
    ];

  }
}
