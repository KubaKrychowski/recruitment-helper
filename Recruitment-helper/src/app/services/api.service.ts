import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL || 'Pass your url here';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  sendPostRequest(requestBody: any){
    return this.http.post(`${API_URL}/AddNewRecrutation`, requestBody);
  }

  sendGetRequest(url: string){
    return this.http.get(`${API_URL}/${url}`);
  }

  sendLogInRequest(requestBody: any) {
    return this.http.post(`${API_URL}/LogIn`, requestBody);
  }
}
