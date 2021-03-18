import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user: any;
  //isLoggedIn: boolean = false;
  baseURL = `http://localhost:3000`;
  constructor(private http: HttpClient) {}

  login(data) {
    let headers = new HttpHeaderResponse();
    return this.http.post(`${this.baseURL}/login`, data).pipe(
      map((response) => {
        this.user = response;
        if (this.user && this.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        }
        return this.user;
      })
    );
  }
  registerUSer(user) {
    let headers = new HttpHeaderResponse();
    return this.http.post(`${this.baseURL}/register`, user);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken(token: string) {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = localStorage.getItem('token');
    //var b = jwt_decode(token);
    if (token) {
      return token;
    } else {
      return null;
    }
  }

  getUser(user: string) {
    return this.http.get(`${this.baseURL}/${user}`);
  }

  isLoggedIn() {
    var user = this.getUserPayload();

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  getUsername() {
    return localStorage.getItem('email');
  }

  getUsers(id: string) {
    return this.http.get(`http://localhost:3000/api/user/${id}`);
  }
}
