import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {ScpiModel} from "../model/scpi.model";
import {HttpClient} from "@angular/common/http";
import {ScpiDetailModel} from "../model/scpi-detail.model";

@Injectable({
  providedIn: 'root'
})
export class ScpiService {

  constructor(private http: HttpClient) { }

  fetchScpiList(): Observable<ScpiModel[]> {
    return this.http.get<ScpiModel[]>("mock/scpi_mock_data.json");
  }

  getScpiById(id: number): Observable<ScpiDetailModel> {
    return this.http.get<ScpiDetailModel>("mock/scpi_details_mock.json");

  }
}
