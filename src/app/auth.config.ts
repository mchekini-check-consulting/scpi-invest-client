import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://keycloak.check-consulting.net/realms/master',
  redirectUri: window.location.origin,
  clientId: 'scpi-invest',
  responseType: 'code',
  scope: 'openid profile email',
  logoutUrl : 'https://keycloak.check-consulting.net/realms/master/protocol/openid-connect/logout',
  postLogoutRedirectUri: window.location.origin,
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
  useSilentRefresh: false,
  requireHttps: false
}
