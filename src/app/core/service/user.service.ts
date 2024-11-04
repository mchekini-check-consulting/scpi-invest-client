import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserModel } from "../model/user.model";
import {UserPreferenceModel} from "../model/user-preference.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private oauthService: OAuthService, private http: HttpClient) {
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

  createOrUpdateUserPreferences(userPreferenceModel: UserPreferenceModel): Observable<void> {
    return this.http.post<void>("api/v1/user/preference",userPreferenceModel);
  }

  getUserPreferences(): Observable<UserPreferenceModel> {
    return this.http.get<UserPreferenceModel>("api/v1/user/preference");
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
