import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgClass, NgIf} from "@angular/common";
import {SummaryCardData} from "../../../core/model/summary-card.model";

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent implements OnInit {
  @Input() data!: SummaryCardData;
  @Input() isPercent:boolean=false;


  ngOnInit(): void {

  }
}
