import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlannedInvestmentModel} from "../model/planned-investment.model";

@Injectable({
  providedIn: 'root'
})
export class PlannedInvestementService {

  constructor(private http: HttpClient) { }

  createPlannedInvestment(plannedInvestment: PlannedInvestmentModel): Observable<boolean> {
    return this.http.post<boolean>("/api/v1/planified-investement", plannedInvestment);
  }
}
