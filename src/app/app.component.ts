import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OAuthErrorEvent, OAuthEvent, OAuthService, OAuthSuccessEvent} from "angular-oauth2-oidc";
import {authConfig} from "./auth.config";
import {UserService} from "./core/service/user.service";

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

  constructor(private oauthService: OAuthService, private userService: UserService) {

    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event instanceof OAuthSuccessEvent) {
        if (event.type === 'token_received' || event.type === 'token_refreshed') {
          this.userService.loadUser();
        }
      } else if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent:', event);
        console.log("une erruer s'est produite sur l'authentification");
      }
    });

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }


}
