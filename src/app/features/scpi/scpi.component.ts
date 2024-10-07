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

  selectedRegions!: Region[];
  selectedSectors!: Sector[];

  @Input() fromWhere:string="invest";
  @Output("OnAddBtnClick") onAddBtnClick = new EventEmitter<ScpiModel>();
  constructor(private scpiService:ScpiService, private router: Router) {}


  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data =>{
      this.scpiListData = data;
    });
    this.setSearchCriteriaValue()
  }

  showScpiDetail(id: number) {
    this.router.navigateByUrl("scpi/" + id);

  }
  investirFunction(scpi:ScpiModel) {
    if(this.fromWhere ==="simulation")
      this.onAddBtnClick.emit(scpi);
    else if(this.fromWhere == "invest")
      console.log('Button clicked on investire '+scpi.id);

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
