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
    console.log(claims);
    if (claims) {
      this.userSubject.next({
        userName: claims['preferred_username'],
        lastName : claims['family_name'],
        firstName : claims['given_name'],
        email: claims['email']
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
}
