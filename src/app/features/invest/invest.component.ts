import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {UserScpiModel} from "../../core/model/user-scpi.model";
import {ScpiService} from "../../core/service/scpi.service";
import {TabViewModule} from "primeng/tabview";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {PaginatorModule} from "primeng/paginator";
import {PrimeNGConfig} from "primeng/api";
import {Button} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {StatChartComponent} from "./stat-chart/stat-chart.component";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";

@Component({
  selector: 'app-invest',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    TabViewModule,
    BadgeModule,
    AvatarModule,
    NgIf,
    PaginatorModule,
    Button,
    RatingModule,
    TagModule,
    PercentPipe,
    StatChartComponent,
    CardModule,
    PanelModule
  ],
  templateUrl: './invest.component.html',
  styleUrl: './invest.component.css'
})
export class InvestComponent implements OnInit{

  scpiOwnedList!: UserScpiModel[];
  scpiInPendingList!: UserScpiModel[];

  constructor(private scpiService: ScpiService, private primengConfig: PrimeNGConfig) {
  }
  ngOnInit(): void {

    this.scpiOwnedList = [];
    this.scpiInPendingList = [];


    this.primengConfig.ripple = true;

    this.scpiService.userScpiService().subscribe(data => {


      data.forEach(scpi => {
        if(scpi.status === 'En cours') {
          this.scpiInPendingList.push({
            ...scpi,
            transactionDate : new Date(scpi.transactionDate)
          });
        }
        else {
          this.scpiOwnedList.push({
            ...scpi,
            transactionDate : new Date(scpi.transactionDate)
          });
        }
      })
    })
  }
}
