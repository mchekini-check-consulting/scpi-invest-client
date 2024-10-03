import {Component, OnInit} from '@angular/core';
import { MessageService } from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Scpi_itemComponent} from "./components/scpi_item/scpi_item.component";
import {PaysService} from "../../core/service/pays.service";


@Component({
  selector: 'app-scpi',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    Scpi_itemComponent,


  ],
  providers: [MessageService, OAuthService],
  templateUrl: './scpi.component.html',
  styleUrl: './scpi.component.css'
})
export class ScpiComponent implements OnInit{
  scpiListData : BehaviorSubject<ScpiModel[]> = new BehaviorSubject<ScpiModel[]>([]);

  constructor(private scpiService:ScpiService, private countryService: PaysService) {}

  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data =>{
      this.scpiListData.next(data);
    });
  }
}
