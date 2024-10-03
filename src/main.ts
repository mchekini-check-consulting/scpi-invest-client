import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// async function configureAuth(oauthService: OAuthService) {
//   oauthService.configure(authCodeFlowConfig);
//   await oauthService.loadDiscoveryDocumentAndTryLogin();
//
//   if (!oauthService.hasValidAccessToken()) {
//     oauthService.initCodeFlow();
//   }
// }

bootstrapApplication(AppComponent, appConfig)
  // .then(async appRef => {
  //   const oauthService = appRef.injector.get(OAuthService);
  //   await configureAuth(oauthService);
  // })
  .catch((err) => console.error(err));
