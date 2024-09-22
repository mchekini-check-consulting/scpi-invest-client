import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";

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

  username:String='';

  constructor(private translate: TranslateService, private oauthService: OAuthService) {
    translate.setDefaultLang('fr');
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
    this.oauthService.logOut();
  }
}
