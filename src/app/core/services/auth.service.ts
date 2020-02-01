import { Token } from './../../shared/models/token.model';
import { UserService } from './user.service';
import { User } from './../../shared/models/user.model';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  private token: BehaviorSubject<Token>;
  public tokenObservable: Observable<Token>;
  private user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.token = new BehaviorSubject<Token>(this.tokenService.getToken());
    this.tokenObservable = this.token.asObservable();
  }

  public get currentToken(): Token {
    return this.token.value;
  }

  public getCurrentUser() {
    return this.user;
  }

  login(user: any): Observable<Token> {
    return this.http.post<Token>(AUTH_URL, user, httpOptions).pipe(
      tap(token => {
        this.tokenService.setToken(token);
        this.token.next(token);
        this.userService.getById(token.id).subscribe(user => (this.user = user));
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
