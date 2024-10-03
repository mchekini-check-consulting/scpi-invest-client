import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {ScpiModel} from "../model/scpi.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScpiService {

  constructor(private http: HttpClient) { }

  fetchScpiList(): Observable<ScpiModel[]> {
    return this.http.get<ScpiModel[]>("mock/scpi_mock_data.json");
  }
}
