import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ScpiInvestModel} from "../model/scpi-invest.model";
import {Observable} from "rxjs";
import {PaymentInfoModel} from "../model/payment_info.model";
import {userInvestmentInDto} from "../model/scpi-simulated.model";
import {InvestmentSummaryModel} from "../model/investment-summary.model";

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient) {
  }

  investInScpi(scpiInvestModel: ScpiInvestModel): Observable<PaymentInfoModel> {
    return this.http.post<PaymentInfoModel>("/api/v1/investement", scpiInvestModel);
  }

  getInvestments() : Observable<userInvestmentInDto[]> {
    return this.http.get<userInvestmentInDto[]>("/api/v1/investement/investment-simulation");
  }

  getInvetementSummary(): Observable<InvestmentSummaryModel> {
    return this.http.get<InvestmentSummaryModel>("/api/v1/investement/summary");

  }
}
