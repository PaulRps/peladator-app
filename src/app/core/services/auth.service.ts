import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const AUTH_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: BehaviorSubject<any>;
  public tokenObservable: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
    this.token = new BehaviorSubject<any>(this.tokenService.getToken());
    this.tokenObservable = this.token.asObservable();
  }

  public get currentToken(): any {
    return this.token.value;
  }

  login(user: any) {
    return this.http.post(AUTH_URL, user, httpOptions).pipe(
      tap(token => {
        this.tokenService.setToken(token);
        this.token.next(token);
        return token;
      }),
      catchError(LoggerService.handleError<any>('Login'))
    );
  }

  logout() {
    this.tokenService.remove();
    this.token.next(null);
    this.router.navigate(['/login']);
  }
}
