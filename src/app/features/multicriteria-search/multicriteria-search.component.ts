import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {SelectButtonModule} from "primeng/selectbutton";
import {Button} from "primeng/button";
import {SelectableButtonComponent} from "./components/selectable-button/selectable-button.component";
import {ToggleButtonModule} from "primeng/togglebutton";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {SliderModule} from "primeng/slider";
import {DividerModule} from "primeng/divider";
import {ScpiSearch} from "../../core/model/scpi-search.model";

interface Region {
  name: string,
  code: string
}
interface Sector {
  name: string,
  icon:string
}

@Component({
  selector: 'app-multicriteria-search',
  standalone: true,
  imports: [
    SidebarModule,
    MultiSelectModule,
    FormsModule,
    NgIf,
    NgForOf,
    SelectButtonModule,
    Button,
    NgStyle,
    SelectableButtonComponent,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    SliderModule,
    DividerModule
  ],
  templateUrl: './multicriteria-search.component.html',
  styleUrl: './multicriteria-search.component.css'
})
export class MulticriteriaSearchComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  regions!: Region[];
  sector!: Sector[];
  selectedRegion: string[]=[];
  selectedSector: string[]=[];
  amount:number=0;
  applyFees?:boolean=false;
  feesChanged:boolean=false;
  searchRequest:ScpiSearch|undefined;
  @Input() onSimulation:boolean=false;
  @ViewChildren('children') childrenComponents!: QueryList<SelectableButtonComponent>;
  @Output("filter") filter = new EventEmitter<ScpiSearch>();

  constructor() {
  }

  ngOnInit(): void {
    this.multicriteraInitData();

  }

  changeFees():void{
    this.applyFees=!this.applyFees;
    this.feesChanged=true;
  }

  onSectorSelected(value: string) {
    console.log('Valeur sélectionnée:', value);
    if (this.selectedSector.includes(value)) {
      const index = this.selectedSector.indexOf(value);
      if (index > -1) {
        this.selectedSector.splice(index, 1);
      }
    } else {
      this.selectedSector.push(value);
    }

  }

  onLanguageSelected(value:string){
    console.log('valeur selectionnee:', value);
    if(this.selectedRegion.includes(value)){
      const index = this.selectedRegion.indexOf(value);
      if (index > -1) {
        this.selectedRegion.splice(index, 1);
      }
    }else{
      this.selectedRegion.push(value);
    }
  }

  clearFilter(){
    this.searchRequest={};
    this.selectedRegion=[];
    this.selectedSector=[];
    this.amount=0;
    this.applyFees=false;
    this.feesChanged=false;
    this.childrenComponents.forEach(child => {
      child.clearSelection();
    });
    this.filter.emit(this.searchRequest)
  }

  initSearchBody():void{
    if(this.searchRequest===undefined){
      this.searchRequest={};
    }
    if(this.amount>0){
      this.searchRequest.amount=this.amount;
    }
    if(this.feesChanged){
      this.searchRequest.fees=this.applyFees;
    }
    if(this.selectedSector.length>0){
      this.searchRequest.sectors=this.selectedSector;
    }
    if(this.selectedRegion.length>0){
      this.searchRequest.localizations=this.selectedRegion;
    }
    this.filter.emit(this.searchRequest);
  }


  multicriteraInitData():void{

    this.sector = [
      { name: "Résidentiel",icon:"pi pi-home"},
      { name: "Bureaux",icon:"pi pi-building" },
      { name: "Hôtels",icon:"pi pi-building-columns" },
      { name: "Commerces", icon:"pi pi-shop" },
      { name: "Logistique",icon:"pi pi-microchip" },
      { name: "Santé", icon:"pi pi-asterisk" },
      { name: "Locaux d’activité",icon:"pi pi-shopping-bag" },
      { name: "Transport", icon:"pi pi-car" },
      { name: "Autres",icon:"pi pi-box" }
    ];

    this.regions = [
      { name: 'Grande-Bretagne', code: 'GB' },
      { name: 'Espagne', code: 'ES' },
      { name: 'Irlande', code: 'IE' },
      { name: 'Italie', code: 'IT' },
      { name: 'Allemagne', code: 'DE' },
      { name: 'Pays-Bas', code: 'NL' },
      { name: 'France', code: 'FR' },
      { name: 'Pologne', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Belgique', code: 'BE' },
      { name: 'Autres', code: 'EU' }
    ];
 }
}
