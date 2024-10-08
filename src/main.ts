import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {authConfig} from "./app/auth.config";
import {OAuthService} from "angular-oauth2-oidc";

async function configureAuth(oauthService: OAuthService) {
  oauthService.configure(authConfig);
  await oauthService.loadDiscoveryDocumentAndLogin();

}



bootstrapApplication(AppComponent, appConfig)
  .then(async appRef => {
    const oauthService = appRef.injector.get(OAuthService);
    // await configureAuth(oauthService);
  })
  .catch((err) => console.error(err));
