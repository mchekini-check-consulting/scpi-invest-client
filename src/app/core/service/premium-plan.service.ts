import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ScpiModel} from "../model/scpi.model";
import {PremiumPlanModel} from "../model/premium-plan-model";

@Injectable({
  providedIn: 'root'
})
export class PremiumPlanService {

  constructor(private http: HttpClient) { }

  getPlans(): Observable<PremiumPlanModel[]> {
    return this.http.get<PremiumPlanModel[]>("api/v1/plan");
  }

  sendPlan(plan: String): Observable<any> {
    return this.http.put<any>(
      `api/v1/plan?newRole=${encodeURIComponent(plan.toString())}`,
      {}
    );
  }
}
