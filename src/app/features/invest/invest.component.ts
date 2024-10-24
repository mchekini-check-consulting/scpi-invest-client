import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage, PercentPipe} from "@angular/common";
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
import {Router} from "@angular/router";

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
    PanelModule,
    NgOptimizedImage
  ],
  templateUrl: './invest.component.html',
  styleUrl: './invest.component.css'
})
export class InvestComponent implements OnInit{

  scpiOwnedList!: UserScpiModel[];
  scpiInPendingList!: UserScpiModel[];

  constructor(private router: Router, private scpiService: ScpiService, private primengConfig: PrimeNGConfig) {
  }
  ngOnInit(): void {

    this.scpiOwnedList = [];
    this.scpiInPendingList = [];

    this.primengConfig.ripple = true;

    this.scpiService.userScpiService().subscribe(data => {

      data.forEach(scpi => {
        if(scpi.investmentStatus === 'PENDING') {
          this.scpiInPendingList.push({
            ...scpi,
            investmentStatus: 'EN COURS',
            image: "scpi-img/" + this.randomImage() + '.png'
          });
        }
        else if(scpi.investmentStatus === 'VALIDATED') {
          this.scpiOwnedList.push({
            ...scpi,
            image: "scpi-img/" + this.randomImage() + '.png'
          });
        }
      })
    })
  }

  navigateToScpiList(): void {
    this.router.navigate(['/scpi']);
  }

  getDetentionPeriod(requestDate: Date) {
    const now = new Date();

    const diffInMs = now.getTime() - new Date(requestDate).getTime();

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    const days = diffInDays % 30;

    let result = '';

    if(years > 0 && years < 2)
      result += years + ' an';
    if(years >= 2)
      result += years + ' ans';

    if(years > 0 && months > 0)
      result += ' et '

    if(months > 0)
      result += months + ' mois';

    if(months === 0 && years === 0 && days === 1)
      result += '1 jour';
    else if(months === 0 && years === 0 && days >= 2)
      result += days + ' jours';

    return result;
  }

  randomImage():string {
    return(Math.floor(Math.random() * 10) + 1).toString();
  }
}
