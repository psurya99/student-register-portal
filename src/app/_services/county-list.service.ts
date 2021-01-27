import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountyListService {

 
  apiBaseUrl = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  constructor(private http: HttpClient) { }

  allCountries(): Observable<any>{
    return this.http.get(this.apiBaseUrl);
  }
 
}