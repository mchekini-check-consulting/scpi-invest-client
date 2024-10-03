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
  cards = [
    {
      title: 'Remake Live',
      rating: 5,
      reviews: 31,
      category: 'Diversifié',
      location: 'France / Europe',
      flag: 'path/to/france-flag.png',
      yield: '7,79 %',
      minimum: '1020 €',
      imageUrl: 'path/to/image1.jpg'
    },
    {
      title: 'Project A',
      rating: 4,
      reviews: 25,
      category: 'Immobilier',
      location: 'France',
      flag: 'path/to/france-flag.png',
      yield: '6,50 %',
      minimum: '500 €',
      imageUrl: 'path/to/image2.jpg'
    },
    {
      title: 'Venture B',
      rating: 4.5,
      reviews: 40,
      category: 'Technologie',
      location: 'Europe',
      flag: 'path/to/europe-flag.png',
      yield: '8,00 %',
      minimum: '1500 €',
      imageUrl: 'path/to/image3.jpg'
    },
    {
      title: 'Real Estate Fund',
      rating: 4.8,
      reviews: 20,
      category: 'Diversifié',
      location: 'France',
      flag: 'path/to/france-flag.png',
      yield: '7,30 %',
      minimum: '2000 €',
      imageUrl: 'path/to/image4.jpg'
    }
  ];

  constructor(private oauthService: OAuthService) {
  }


  ngOnInit() {


  }
}
