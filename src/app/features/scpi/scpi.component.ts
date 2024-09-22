import {Component, OnInit} from '@angular/core';
import { MessageService } from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";


@Component({
  selector: 'app-scpi',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule

  ],
  providers: [MessageService, OAuthService],
  templateUrl: './scpi.component.html',
  styleUrl: './scpi.component.css'
})
export class ScpiComponent implements OnInit{
  username: string = "";

  constructor(private oauthService: OAuthService) {
  }


  ngOnInit() {

    let claims = this.oauthService.getIdentityClaims();
    if (claims) {
      this.username = claims['preferred_username'];
    }

  }
}
