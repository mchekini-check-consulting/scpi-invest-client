import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {UserScpiModel} from "../../core/model/user-scpi.model";
import {ScpiService} from "../../core/service/scpi.service";
import {TabViewModule} from "primeng/tabview";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {UserScpiService} from "../../core/service/user-scpi.service";
import {StatChartComponent} from "./stat-chart/stat-chart.component";
import {CardModule} from "primeng/card";

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
    StatChartComponent,
    CardModule
  ],
  templateUrl: './invest.component.html',
  styleUrl: './invest.component.css'
})
export class InvestComponent implements OnInit{

  userScpiList!: UserScpiModel[];

  currentRequest = [
    { field: 'scpiName', header: 'Nom' },
    { field: 'transactionDate', header: 'Demandée le' },
    { field: 'amount', header: 'Montant' },
    { field: 'status', header: 'Statut' }
  ];

  userScpi = [
    { field: 'scpiName', header: 'Nom' },
    { field: 'transactionDate', header: 'Demandée le' },
    { field: 'amount', header: 'Montant' },
    { field: 'price', header: 'Valeur actuelle' },
    { field: 'distributionRate', header: 'Rendement' }
  ];

  constructor(private userScpiService: UserScpiService,) {
  }
  ngOnInit(): void {

    this.userScpiService.userScpiService().subscribe(data => {
        this.userScpiList = data;
        console.log(data);
      }
    )
  }
}
