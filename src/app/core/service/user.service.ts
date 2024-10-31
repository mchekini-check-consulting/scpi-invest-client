import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserModel } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private oauthService: OAuthService) {
    this.loadUser();
  }


  public loadUser() {
    const claims = this.oauthService.getIdentityClaims();
    let payload = this.decodeJwt(this.oauthService.getAccessToken());
    let connectedUserRole = payload?.realm_access?.roles[0];
    if (claims) {
      this.userSubject.next({
        userName: claims['preferred_username'],
        lastName : claims['family_name'],
        firstName : claims['given_name'],
        email: claims['email'],
        role: connectedUserRole
      });
    }
  }


  public getUser() {
    return this.userSubject.value;
  }


  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public logout() {
    this.oauthService.logOut();
    this.userSubject.next(null);
  }

  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur de décodage du token JWT', error);
      return null;
    }
  }
}
