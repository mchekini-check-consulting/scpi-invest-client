import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "./core/config/auth.config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [OAuthService]
})
export class AppComponent {
  username: string = '';

  constructor(private oauthService: OAuthService) {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      this.username = claims['preferred_username'];
    }
  }

  logout() {
    this.oauthService.logOut();
  }
}
