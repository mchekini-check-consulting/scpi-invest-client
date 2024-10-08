import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";
import {UserService} from "../../../service/user.service";
import {filter} from "rxjs";

interface Lang {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers : [OAuthService]
})
export class NavbarComponent implements OnInit{

  lang: Lang[] | undefined;

  selectedLang: String ="Français";
  selectedFlag: string = 'img/Flag_fr.png';

  username:string | undefined='';

  constructor(private translate: TranslateService, private oauthService: OAuthService, private userService: UserService) {
    translate.setDefaultLang('fr');

    this.userService.user$.subscribe(user => {
      if (user != null)
      this.username = user.firstName + " " + user.lastName ;
    });

  }

  ngOnInit() {
    this.lang = ([
      {name:"Français", code: "fr",flag:'img/Flag_fr.png'},
      {name:"English",code: "en",flag:'img/Flag_gb.png'},
    ]);

    let claims = this.oauthService.getIdentityClaims();
    if (claims) {
      this.username = claims['name'];
    }

  }

  switchLanguage(language: string) {
    const selectedLanguage = this.lang!.find(lang => lang.code === language);
    if (selectedLanguage) {
      this.selectedLang = selectedLanguage.name;
      this.selectedFlag = selectedLanguage.flag;
    }
    this.translate.use(language);
  }

  logout() {
    this.deleteCookie('AUTH_SESSION_ID');
    this.deleteCookie('AUTH_SESSION_ID_LEGACY');
    this.deleteCookie('KEYCLOAK_IDENTITY');
    this.deleteCookie('KEYCLOAK_IDENTITY_LEGACY');
    this.deleteCookie('KEYCLOAK_SESSION');
    this.deleteCookie('KEYCLOAK_SESSION_LEGACY');
    setTimeout(() => {
      this.logout();
    }, 2000)
  }

  deleteCookie(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
  }
}
