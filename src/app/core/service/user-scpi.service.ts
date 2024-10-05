import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserScpiModel} from "../model/user-scpi.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserScpiService {

  constructor(private http: HttpClient) {}

  userScpiService() : Observable<UserScpiModel[]> {

    return this.http.get<UserScpiModel[]>("mock/user_data.json");
  }
}
