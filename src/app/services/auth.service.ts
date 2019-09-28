import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();

  PRODUCTION_HEROKU = 'https://mlm-api.herokuapp.com'

  PRODUCTION_URL = 'http://13.232.193.81:4000';
  DEVELOPMENT_URL = 'http://localhost:4000'
  CURRENT_URL = this.PRODUCTION_HEROKU;

  constructor(private http: HttpClient) {
  }


  authenticateOffice(data) {
    return this.http.post(`${this.CURRENT_URL}/api/office/office-login`, {
      password: data.password,
      username: data.login
    }).pipe(map((response: LoginResponse) => {
      if (response && response.token) {
        localStorage.setItem('auth-token', response.token);
        return true;
      } else {
        return false;
      }
    }));
  }


  getAuthenticationStatus() {

    const jwthelper = new JwtHelperService();
    const token = localStorage.getItem('auth-token')
    if (token) {
      if (!jwthelper.isTokenExpired(token)) {
        return true
      }
      else {
        return false
      }
    }
    return false;
  }
}
