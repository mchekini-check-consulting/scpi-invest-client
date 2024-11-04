import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaxModel} from "../model/tax.model";

@Injectable({
  providedIn: 'root'
})
export class TaxService {


  constructor(private http: HttpClient) {

  }

  getTaxForCurrentSimulation(tax: {annualScpiIncome: number, percentInvestmentInFrance : number}): Observable<TaxModel> {
    return this.http.post<TaxModel>("api/v1/tax", tax);
  }







}
