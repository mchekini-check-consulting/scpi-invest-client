import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserScpiModel} from "../model/user-scpi.model";

@Injectable({
  providedIn: 'root'
})
export class ScpiService {

  constructor(private http: HttpClient) {}

  userScpiService() : Observable<UserScpiModel[]> {

    return this.http.get<UserScpiModel[]>("mock/user_data.json");
  }
}
