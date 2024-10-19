import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ScpiInvestModel} from "../model/scpi-invest.model";
import {Observable} from "rxjs";
import {PaymentInfoModel} from "../model/payment_info.model";

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient) {
  }

  investInScpi(scpiInvestModel: ScpiInvestModel): Observable<PaymentInfoModel> {
    return this.http.post<PaymentInfoModel>("/api/v1/investement", scpiInvestModel);
  }
}
