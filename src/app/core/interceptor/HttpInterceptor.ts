import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {OAuthService} from "angular-oauth2-oidc";

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {


  const oauthService = inject(OAuthService);

  const accessToken = oauthService.getAccessToken();

  if (accessToken != null) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    })
  }

  return next(req);


}
