import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Statistique} from "../model/statistique.model";

@Injectable({
  providedIn: 'root'
})
export class StatScpiService {

  constructor(private http: HttpClient) { }

  getStatistiques(): Observable<Statistique> {
    return this.http.get<Statistique>('mock/stats_scpi_data.json');
  }
}
