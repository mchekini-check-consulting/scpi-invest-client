import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {ScpiModel} from "../model/scpi.model";
import {HttpClient} from "@angular/common/http";
import {ScpiDetailModel} from "../model/scpi-detail.model";
import {UserScpiModel} from "../model/user-scpi.model";
import {ScpiSearch} from "../model/scpi-search.model";

@Injectable({
  providedIn: 'root'
})
export class ScpiService {

  constructor(private http: HttpClient) { }

  fetchScpiList(): Observable<ScpiModel[]> {
    return this.http.get<ScpiModel[]>("api/v1/scpi");
  }

  getScpiById(id: number): Observable<ScpiDetailModel> {
    return this.http.get<ScpiDetailModel>("api/v1/scpi/" + id);

  }

  userScpiService() : Observable<UserScpiModel[]> {

    return this.http.get<UserScpiModel[]>("mock/user_data.json");
  }

  searchScpi(search?:ScpiSearch): Observable<ScpiModel[]> {
    return this.http.post<ScpiModel[]>("api/v1/scpi/search",search);
  }
}
