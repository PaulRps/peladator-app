import { User } from './../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';

const USER_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${USER_URL}/${id}`).pipe(
      tap(_ => LoggerService.log('fetched user', _)),
      catchError(LoggerService.handleError('user', undefined))
    );
  }
}
