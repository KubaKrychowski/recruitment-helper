import { UserLoginDataDtoModel } from './../shared/models/user-login-data-dto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegisterDataDtoModel } from '../shared/models/user-register-data-dto.model';

const API_URL = environment.apiURL || 'Pass your url here';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string | null = null;

  public get isUserAuthenticated(): boolean {
    return !!this.token;
  }

  constructor(private http: HttpClient) {}
  sendPostRequest(url: string, requestBody: any) {
    return this.http.post(`${API_URL}${url}`, requestBody);
  }

  sendGetRequest(url: string) {
    let headers = null;
    new HttpHeaders();
    console.log(this.token);

    if (this.token) {
      headers = new HttpHeaders().set('token', this.token);
    }

    if (headers) {
      return this.http.get(`${API_URL}${url}`, {
        headers: headers,
      });
    } else {
      return this.http.get(`${API_URL}${url}`);
    }
  }

  sendRegisterRequest(requestBody: UserRegisterDataDtoModel) {
    return this.http.post<UserRegisterDataDtoModel>(`${API_URL}idp/register`, requestBody);
  }

  sendLogInRequest(requestBody: UserLoginDataDtoModel) {
    return this.http.post<string>(`${API_URL}idp/login`, requestBody);
  }
}
