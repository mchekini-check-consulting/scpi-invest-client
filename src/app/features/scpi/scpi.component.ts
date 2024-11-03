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
import {MulticriteriaSearchComponent} from "../multicriteria-search/multicriteria-search.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {ScpiSearch} from "../../core/model/scpi-search.model";
import {debounceTime, Subject} from "rxjs";




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
    MulticriteriaSearchComponent,
    IconFieldModule,
    InputIconModule,
  ],
  providers: [MessageService, OAuthService],
  templateUrl: './scpi.component.html',
  styleUrl: './scpi.component.css'
})
export class ScpiComponent implements OnInit{
  scpiListData : ScpiModel[] | undefined;
  items: MegaMenuItem[] | undefined;
  value: number = 50000;
  selectedScpi?:ScpiModel;
  scpiDetails?:ScpiDetailModel;
  showFormDialog: boolean = false;
  bankInformation?:PaymentInfoModel;
  username?:String;
  email?:String;
  filterVisible:boolean = false;
  searchSubject = new Subject<string>();

  @Input() fromWhere:string="invest";
  @Output("OnAddBtnClick") onAddBtnClick = new EventEmitter<ScpiModel>();
  constructor(private scpiService:ScpiService, private router: Router, private investService: InvestService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      if (user != null)
        this.username = user.firstName + " " + user.lastName ;
        this.email = user?.email;
        this.initAndLoadScpiData();
    });

    let scpiRequest:ScpiSearch={};

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchText) => {
      if(searchText!==""){
        scpiRequest.searchTerm =searchText;
        console.log(scpiRequest.searchTerm);

        this.search(scpiRequest);
      }else{
        scpiRequest={};
        this.search(scpiRequest);

      }

    });
  }



  ngOnInit() {
    this.initAndLoadScpiData();

  }

  private initAndLoadScpiData() {
    this.scpiService.fetchScpiList().subscribe(data => {
      this.scpiListData = data;
      this.scpiListData.forEach((scpi) => scpi.image = this.randomImage())
    });
  }

  getScpiDetail(scpiId:number): void{
    this.scpiService.getScpiById(scpiId).subscribe(data=>{
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

  showFilter(){
    this.filterVisible=!this.filterVisible;
  }

  onSearchInputChange(value: any): void {
    let inputValue = value.target.value;
    if(inputValue.length>=3){

      this.searchSubject.next(inputValue);
    }else{
      this.searchSubject.next("");
    }
  }

  search(scpiSearch:ScpiSearch):void{
    this.scpiService.searchScpi(scpiSearch).subscribe(data=>{
      this.scpiListData = data;
      this.scpiListData.forEach((scpi)=> scpi.image=this.randomImage())

    })
  }

  onDialogHide() {
    this.filterVisible = false;
  }
}
