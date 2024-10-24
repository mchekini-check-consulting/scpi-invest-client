import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
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
  icon: string
}

interface Fees {
  name: string,
  type: boolean | null,
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
  selectedRegion: string[] = [];
  selectedSector: string[] = [];
  amount: number = 0;
  searchRequest: ScpiSearch | undefined;
  @Input() onSimulation: boolean = false;
  @ViewChildren('children') childrenComponents!: QueryList<SelectableButtonComponent>;
  @Output("filter") filter = new EventEmitter<ScpiSearch>();
  @Output("onDialogHide") onDialogHide = new EventEmitter<boolean>();

  selectedFees: Fees | undefined;
  applayedFees: Fees[] | undefined;
  isResetDesibled: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.applayedFees = [
      {
        name: "Non",
        type: false
      },
      {
        name: "Tous",
        type: null
      },
      {
        name: "Oui",
        type: true
      }

    ];
    this.selectedFees = {
      name: "Tous",
      type: null
    };
    this.multicriteraInitData();

  }

  onSectorSelected(value: string) {
    if (this.selectedSector.includes(value)) {
      const index = this.selectedSector.indexOf(value);
      if (index > -1) {
        this.selectedSector.splice(index, 1);
      }
    } else {
      this.selectedSector.push(value);
    }
    if (this.selectedSector.length >= 1) {
      this.isResetDesibled = false;
    } else {
      this.isResetDesibled = false;
    }
  }


  onLocatizationSelected(value: Region) {

    if (value.code === 'EU') {
      this.childrenComponents.forEach(child => {
        if (child.image !== undefined && child.image === 'EU' && child.isSelected) {
          this.disableAllCountriesExceptEU();
          this.selectedRegion = this.regions
            .map(region => region.name).filter(region => region !== "France" && region !== "Zone Europe sans France");
        } else if (child.image !== undefined && child.image === 'EU' && !child.isSelected) {
          this.EnableDisabledCountries();
          this.selectedRegion = [];
        }
      })
    }
    else {
      if (this.selectedRegion.includes(value.name)) {
        const index = this.selectedRegion.indexOf(value.name);
        if (index > -1) {
          this.selectedRegion.splice(index, 1);
        }
      } else {
        this.selectedRegion.push(value.name);
      }
    }
    this.isResetDesibled = this.selectedRegion.length < 1;
  }

  private EnableDisabledCountries() {
    this.childrenComponents.forEach(child => {
      if (child.image !== 'EU') {
        child.isDesibled = false;
      }
    })
  }

  private disableAllCountriesExceptEU() {
    this.childrenComponents.forEach(child => {
      if (child.image !== 'EU') {
        child.clearSelection();
        child.isDesibled = true;
      }
    })

  }


  clearFilter() {
    this.searchRequest = {};
    this.selectedRegion = [];
    this.selectedSector = [];
    this.amount = 0;
    this.selectedFees = {
      name: "Tout",
      type: null
    };
    this.childrenComponents.forEach(child => {
      child.clearSelection();
    });
    this.filter.emit(this.searchRequest)
    this.isResetDesibled = true;
  }

  initSearchBody(): void {
    if (this.searchRequest === undefined) {
      this.searchRequest = {};
    }
    if (this.amount > 0) {
      this.searchRequest.amount = this.amount;
    }
    if (this.selectedFees?.type !== null) {
      this.searchRequest.fees = this.selectedFees?.type;
    } else {
      this.searchRequest.fees = undefined;
    }
    if (this.selectedSector.length === 0) this.searchRequest.sectors = undefined;
    else this.searchRequest.sectors = this.selectedSector;

    if (this.selectedRegion.length === 0) this.searchRequest.localizations = undefined;
    else this.searchRequest.localizations = this.selectedRegion;

    this.filter.emit(this.searchRequest);
  }


  multicriteraInitData(): void {

    this.sector = [
      {name: "Résidentiel", icon: "pi pi-home"},
      {name: "Bureaux", icon: "pi pi-building"},
      {name: "Hôtels", icon: "pi pi-building-columns"},
      {name: "Commerces", icon: "pi pi-shop"},
      {name: "Logistique", icon: "pi pi-microchip"},
      {name: "Santé", icon: "pi pi-asterisk"},
      {name: "Locaux d’activité", icon: "pi pi-shopping-bag"},
      {name: "Transport", icon: "pi pi-car"},
      {name: "Autres", icon: "pi pi-box"}
    ];

    this.regions = [
      {name: "Zone Europe sans France", code: "EU"},
      {name: 'Grande-Bretagne', code: 'GB'},
      {name: 'Espagne', code: 'ES'},
      {name: 'Irlande', code: 'IE'},
      {name: 'Italie', code: 'IT'},
      {name: 'Allemagne', code: 'DE'},
      {name: 'Pays-Bas', code: 'NL'},
      {name: 'France', code: 'FR'},
      {name: 'Pologne', code: 'PL'},
      {name: 'Portugal', code: 'PT'},
      {name: 'Belgique', code: 'BE'},
      {name: 'Autres', code: ''}
    ];
  }

  hideDialog() {
    this.onDialogHide.emit(true);
  }
}
