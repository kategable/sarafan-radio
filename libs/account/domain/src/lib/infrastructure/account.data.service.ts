import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Account} from '../entities/account';

@Injectable({ providedIn: 'root' })
export class AccountDataService {

    constructor(private http: HttpClient) {
    }

    load(): Observable<Account[]> {

        // Uncomment if needed
        /*
        const url = '...';
        const params = new HttpParams().set('param', 'value');
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<Account[]>(url, {params, headers});
        */

        return of([
        // {id: 3, name: 'Duis autem', description: 'Duis autem vel eum iriure dolor in hendrerit'},
        ]);
      }
}
