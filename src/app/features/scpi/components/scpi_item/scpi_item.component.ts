import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ScpiModel} from "../../../../core/model/scpi.model";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {PaysService} from "../../../../core/service/pays.service";


@Component({
  selector: 'app-scpi-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CommonModule
  ],
  templateUrl: './scpi_item.component.html',
  styleUrl: './scpi_item.component.css'
})
export class Scpi_itemComponent {

  @Input() scpi: ScpiModel | undefined;
  @Output("onShowDetailClick") onShowDetailClick = new EventEmitter<number>();


  constructor(private paysService: PaysService) {
  }

  getCountryCode(pays: string): string | null {
    return this.paysService.getCodeByCountryName(pays);
  }

  showScpiDetails(scpi: ScpiModel | undefined) {
    this.onShowDetailClick.emit(scpi?.id);
  }
}
