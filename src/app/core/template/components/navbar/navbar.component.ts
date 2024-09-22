import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";

interface Lang {
  name: string;
  code: string;
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

  selectedLang: String ="🇫🇷 Français";

  constructor(private translate: TranslateService, private oauthService: OAuthService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.lang = ([
      {name:"🇫🇷 Français", code: "fr"},
      {name:"🇬🇧 English",code: "en"}
    ]);

  }

  switchLanguage(language: string) {
    const selectedLanguage = this.lang?.find(lang => lang.code === language);
    this.selectedLang = selectedLanguage ? selectedLanguage.name :"🇫🇷 Français" ;
    this.translate.use(language);
  }

  logout() {
    this.oauthService.logOut();
  }
}
