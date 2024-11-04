import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {SummaryCardData} from "../../../core/model/summary-card.model";

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent implements OnInit {
  @Input() data!: SummaryCardData;


  ngOnInit(): void {

  }
}
