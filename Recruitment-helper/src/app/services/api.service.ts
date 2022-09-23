import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //TODO: Pass API URL by environment variables
  sendPostRequest(requestBody: any){
    return this.http.post('https://localhost:44339/api/AddNewRecrutation', requestBody);
  }

  sendGetRequest(url: string){
    return this.http.get(`https://localhost:44339/api/${url}`);
  }
}
