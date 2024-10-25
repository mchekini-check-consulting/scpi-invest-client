import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {

  private apiUrl = 'mock/comparator_mock.json';

  constructor(private http: HttpClient) { }

  getScpiData(investValue: number, selectedScpis: any[]): Observable<any> {
    const payload = {
      investValue,
      selectedScpis
    };
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllScpis() {
      return this.http.get<any>("mock/scpi_name_mock.json");
    }
}
