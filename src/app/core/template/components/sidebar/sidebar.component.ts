import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {
  TranslateModule,
} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AppDetailsService} from "../../../service/app.details.service";
import {AppDetailModel} from "../../../model/app.detail.model";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  key: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/scpi', title: 'Liste des SCPI ', key: 'SIDEBAR.SCPI', icon: 'pi pi-home', class: ''},
  {path: '/invest', title: 'Mes investissements',key : 'SIDEBAR.INVEST', icon: 'pi pi-chart-line', class: ''},
  {path: '/simulation', title: 'Mes simulations',key : 'SIDEBAR.SIMULATION', icon: 'pi pi-box', class: ''},
  {path: '/versement', title: 'Versement programmê',key : 'SIDEBAR.VERSEMENT', icon: 'pi pi-euro', class: ''},
  {path: '/comparateur', title: 'Comparaison',key : 'SIDEBAR.COMPARATEUR', icon: 'nc-icon nc-layers-3', class: ''},


];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./sidebar.component.scss'],

})
export class SidebarComponent implements OnInit {

  menuItems: RouteInfo[] = [];
  version = "1.0.0";
  appDetails : AppDetailModel | undefined;

  constructor(private userService: UserService, private appDetailsService : AppDetailsService) {

    this.userService.user$.subscribe(user => {
      if (user != null)
        this.appDetailsService.getApplicationDetails().subscribe(resp => {
          this.appDetails = resp;
        })
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
