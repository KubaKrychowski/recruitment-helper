import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendPostRequest(requestBody: any){
    console.log(requestBody);
    return this.http.post('https://localhost:44339/api/AddNewRecrutation', requestBody);
  }
}
