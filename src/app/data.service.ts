import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from './models/case.model';




@Injectable({
  providedIn: 'root'
})
export class DataService {  
  private dbUrl = 'http://localhost:4000'; 

  constructor(private http: HttpClient) {
 
  }
  getCases(): Observable<HttpResponse<Case[]>> {
    return this.http.get<Case[]>(
      `${this.dbUrl}/cases`, { observe: 'response' });
  }

}


