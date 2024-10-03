import { Component } from '@angular/core';
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {NavbarComponent} from "../components/navbar/navbar.component";
import {FooterComponent} from "../components/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {ScpiComponent} from "../../../features/scpi/scpi.component";

@Component({
  selector: 'app-template',
  standalone: true,
  templateUrl: './template.component.html',
  imports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    ScpiComponent
  ],
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {

}
