import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
  }

  setToken(token: any) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  isPresent() {
    return this.getToken() ? true : false;
  }

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
