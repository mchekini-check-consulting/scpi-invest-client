import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {OAuthService} from "angular-oauth2-oidc";
import {ScpiService} from "../../core/service/scpi.service";
import {ScpiModel} from "../../core/model/scpi.model";
import {Scpi_itemComponent} from "./components/scpi_item/scpi_item.component";
import {Router} from "@angular/router";
import {UserService} from "../../core/service/user.service";


@Component({
  selector: 'app-scpi',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    Scpi_itemComponent,
  ],
  providers: [MessageService, OAuthService],
  templateUrl: './scpi.component.html',
  styleUrl: './scpi.component.css'
})
export class ScpiComponent implements OnInit{
  scpiListData : ScpiModel[] | undefined;

  constructor(private scpiService:ScpiService, private router: Router, private userService : UserService) {}

  ngOnInit() {
    this.scpiService.fetchScpiList().subscribe(data =>{
      this.scpiListData = data;
    });
  }

  showScpiDetail(id: number) {
    this.router.navigateByUrl("scpi/" + id);

  }
}
