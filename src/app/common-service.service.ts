import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  token: any;

  constructor(
    private http: HttpClient
  ) { this.token = localStorage.getItem('token') }


  getUserData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get('https://dev-ris-backend.epravaha.com/api/Group?GroupType=Agency', {headers});
    
  }
}

