import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //static authEmitter = new EventEmitter<boolean>();

  accessToken = '';

  constructor(private http: HttpClient) { }

  register(body: any) {
    return this.http.post(`${environment.api}/register`, body);
  }

  // options: {withCredentials: true} can get you the refresh token, returned via cookie from the backend
  login(body: any) {
    return this.http.post(`${environment.api}/login`, body, { withCredentials: true });
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }

  refresh() {
    const body = {};
    return this.http.post(`${environment.api}/refresh`, body, { withCredentials: true });
  }

  logout() {
    const body = {};
    return this.http.post(`${environment.api}/logout`, body, { withCredentials: true });
  }

}
