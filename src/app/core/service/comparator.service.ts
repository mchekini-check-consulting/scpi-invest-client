import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {

  constructor(private http: HttpClient) { }

  getScpiData(investValue: number, selectedScpis: any[]): Observable<any> {
    const payload = {
      investValue,
      selectedScpis
    };
    return this.http.post<any>('mock/comparator_mock.json', payload);
  }
}
