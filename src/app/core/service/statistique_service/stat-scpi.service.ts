import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StatScpiModel} from "../../model/stat-scpi.models";
import {EvalScpiModels} from "../../model/eval-scpi.models";

@Injectable({
  providedIn: 'root'
})
export class StatScpiService {

  constructor(private http: HttpClient) { }

  getRegionScpiService() : Observable<StatScpiModel[]> {

    return this.http.get<StatScpiModel[]>("mock/stat_repartition_geo_mock_data.json");
  }

  getSecteurScpiService() : Observable<StatScpiModel[]> {

    return this.http.get<StatScpiModel[]>("mock/stat_repartition_sect_mock_data.json");
  }

  getEvolutionScpiService(): Observable<EvalScpiModels> {
    return this.http.get<EvalScpiModels>('mock/stat_repartition_eval_mock_data.json');
  }
}
