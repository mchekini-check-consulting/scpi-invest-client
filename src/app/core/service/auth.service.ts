import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {authConfig} from "../../auth.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedOut = false;

  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth() {
    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.isLoggedOut && !this.oauthService.hasValidAccessToken()) {
        this.oauthService.initLoginFlow();
      }
    });
  }

  logout() {
    this.isLoggedOut = true;
    this.oauthService.logOut();
    this.oauthService.logOut(true);
    // @ts-ignore
    this.oauthService.clearHashAfterLogin();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
