import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
//https://sarafanradio.azurewebsites.net

  ping$(): Observable<any> {
    return this.http.get('https://localhost:44387/api/values');
  }
}
