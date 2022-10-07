import { SimplifiedUserDataModel } from './../shared/models/simplified-user-data';
import { UserService } from './user.service';
import { UserLoginDataDtoModel } from './../shared/models/user-login-data-dto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegisterDataDtoModel } from '../shared/models/user-register-data-dto.model';
import { Subject } from 'rxjs';

const API_URL = environment.apiURL || 'Pass your url here';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string | null = null;
  username: Subject<string> = new Subject<string>();

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
    return this.http.post<UserRegisterDataDtoModel>(
      `${API_URL}idp/register`,
      requestBody
    );
  }

  sendLogInRequest(requestBody: UserLoginDataDtoModel) {
    return this.http.post<SimplifiedUserDataModel>(`${API_URL}idp/login`, requestBody);
  }

  checkAndRefreshJWT(token: string){
    return this.http.get<any>(`${API_URL}idp/login/${token}`);
  }
}
