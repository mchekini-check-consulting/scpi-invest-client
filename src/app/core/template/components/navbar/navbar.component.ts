import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";

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
  providers: [OAuthService]
})
export class NavbarComponent implements OnInit {

  lang: Lang[] | undefined;

  selectedLang: String = "Français";
  selectedFlag: string = 'img/Flag_fr.png';

  username: string | undefined = '';

  constructor(private router: Router, private translate: TranslateService, private authService: AuthService,
              private oauthService: OAuthService, private userService: UserService) {
    translate.setDefaultLang('fr');

    this.userService.user$.subscribe(user => {
      if (user != null)
        this.username = user.firstName + " " + user.lastName;
    });

  }

  ngOnInit() {
    this.lang = ([
      {name: "Français", code: "fr", flag: 'img/Flag_fr.png'},
      {name: "English", code: "en", flag: 'img/Flag_gb.png'},
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
    this.authService.logout();
  }


  planBtnClic() {
    this.router.navigate(['/plans']).then(r => console.log("navigate clicked"));
  }

  goToMyProfile() {
    this.router.navigate(["/profile-information"]);
  }
}
