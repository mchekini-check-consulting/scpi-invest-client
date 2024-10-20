import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppDetailModel} from "../model/app.detail.model";

@Injectable({
  providedIn: 'root'
})
export class AppDetailsService {

  constructor(private http: HttpClient) {
  }

  getApplicationDetails(): Observable<AppDetailModel> {
    return this.http.get<AppDetailModel>("/api/v1/details");
  }
}
