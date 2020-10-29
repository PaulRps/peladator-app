import { DialogService } from 'src/app/core/services/dialog.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const USER_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersEvent: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private http: HttpClient, private dialogService: DialogService) {}

  public getEvent(): Observable<User[]> {
    return this.usersEvent;
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${USER_URL}/${id}`).pipe(
      tap(_ => LoggerService.debug('fetched user', _)),
      catchError(LoggerService.handleError('user', undefined))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(`${USER_URL}/form-data`).pipe(
      tap(_ => LoggerService.debug('fetched userFormData', _)),
      catchError(LoggerService.handleError('userFormData', undefined))
    );
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USER_URL).pipe(
      tap(_ => LoggerService.debug('fetched users', _)),
      catchError(LoggerService.handleError('users', undefined))
    );
  }

  save(user: User): Observable<User[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.post<User>(USER_URL, user, httpOptions).pipe(
        tap(usr => {
          LoggerService.debug('saved user', usr);
          this.dialogService.successMessage('Usuário Adicionado!');
        }),
        catchError(LoggerService.handleError('saved user', undefined))
      );
    });
  }

  update(user: User): Observable<User[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.put(USER_URL, user, httpOptions).pipe(
        tap(_ => {
          LoggerService.debug('updated user', user);
          this.dialogService.successMessage('Usuário Atualizado!');
        }),
        catchError(LoggerService.handleError('updated user', undefined))
      );
    });
  }

  delete(id: number): Observable<User[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.delete(`${USER_URL}/${id}`).pipe(
        tap(_ => {
          LoggerService.debug('deleted user', id);
          this.dialogService.successMessage('Usuário Deletado!');
        }),
        catchError(LoggerService.handleError('deleted user', undefined))
      );
    });
  }

  private doRequestAndReturnAll(callback: () => Observable<any>): Observable<User[]> {
    return new Observable(observer => {
      callback().subscribe(any =>
        this.getAll().subscribe(users => {
          this.usersEvent.emit(users);
          observer.next(users);
        })
      );
    });
  }
}
