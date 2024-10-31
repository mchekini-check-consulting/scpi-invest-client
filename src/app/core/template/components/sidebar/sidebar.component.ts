import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule,} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AppDetailsService} from "../../../service/app.details.service";
import {AppDetailModel} from "../../../model/app.detail.model";
import {PremiumPlanService} from "../../../service/premium-plan.service";
import {PremiumPlanModel} from "../../../model/premium-plan-model";
import {OAuthService} from "angular-oauth2-oidc";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  key: string;
  feature: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/scpi', title: 'Liste des SCPI ', key: 'SIDEBAR.SCPI', icon: 'pi pi-home', feature: 'list-scpi', class: ''},
  {
    path: '/invest',
    title: 'Mes investissements',
    key: 'SIDEBAR.INVEST',
    icon: 'pi pi-chart-line',
    feature: 'my-investments',
    class: ''
  },
  {
    path: '/simulation',
    title: 'Mes simulations',
    key: 'SIDEBAR.SIMULATION',
    icon: 'pi pi-box',
    feature: 'simulation',
    class: ''
  },
  {
    path: '/versement',
    title: 'Versement programmê',
    key: 'SIDEBAR.VERSEMENT',
    icon: 'pi pi-euro',
    feature: 'my-planned-investment',
    class: ''
  },
  {
    path: '/comparateur',
    title: 'Comparateur',
    key: 'SIDEBAR.COMPARATEUR',
    icon: 'nc-icon nc-layers-3',
    feature: 'comparator',
    class: ''
  },


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
  appDetails: AppDetailModel | undefined;
  plans: PremiumPlanModel [] = [];

  constructor(private userService: UserService,
              private appDetailsService: AppDetailsService,
              private planService: PremiumPlanService
  ) {

    this.userService.user$.subscribe(user => {
      if (user != null)
      this.appDetailsService.getApplicationDetails().subscribe(resp => {
        this.appDetails = resp;
      });
      this.planService.getPlans().subscribe(plans => {
        this.plans = plans;
      })
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }



  DisplayFeatureForConnectedUser(functionality: string): boolean {
    console.log(this.userService.getUser()?.role);
    if (this.userService.getUser()?.role === 'ROLE_ESSENTIAL')
      return this.plans.some(feature => feature.functionality === functionality && feature.standard)
    else if (this.userService.getUser()?.role === 'ROLE_PREMIUM')
      return this.plans.some(feature => feature.functionality === functionality && feature.premium)
    else return false;
  }

}
