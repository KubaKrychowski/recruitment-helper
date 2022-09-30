import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegisterDataDtoModel } from '../shared/models/user-login-data-dto.model';

const API_URL = environment.apiURL || 'Pass your url here';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string | null = null;

  constructor(private http: HttpClient) {}
  sendPostRequest(url: string, requestBody: any) {
    return this.http.post(`${API_URL}${url}`, requestBody);
  }

  sendGetRequest(url: string) {
    const headers = new HttpHeaders();
    console.log(this.token);
    if (this.token) {
      headers.set('token', this.token);
    }

    console.log(headers);
    return this.http.get(`${API_URL}${url}`, {
      headers: headers,
    });
  }

  sendRegisterRequest(requestBody: UserRegisterDataDtoModel) {
    return this.http.post<string>(`${API_URL}idp/register`, requestBody);
  }

  sendLogInRequest(requestBody: UserRegisterDataDtoModel) {
    return this.http.post<string>(`${API_URL}idp/login`, requestBody);
  }
}
