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
import {PeriodPipe} from "../../core/pipe/period.pipe";

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
    PeriodPipe
  ],
  templateUrl: './invest.component.html',
  styleUrl: './invest.component.css'
})
export class InvestComponent implements OnInit{

  userScpiList!: UserScpiModel[];

  constructor(private scpiService: ScpiService, private primengConfig: PrimeNGConfig) {
  }
  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.scpiService.userScpiService().subscribe(data => {
        this.userScpiList = data.map(item => {
          return {
            ...item,
            transactionDate : new Date(item.transactionDate),
          }
        });
    })
  }
}
