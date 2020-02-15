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
      tap(_ => LoggerService.log('fetched user', _)),
      catchError(LoggerService.handleError('user', undefined))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(`${USER_URL}/form-data`).pipe(
      tap(_ => LoggerService.log('fetched userFormData', _)),
      catchError(LoggerService.handleError('userFormData', undefined))
    );
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USER_URL).pipe(
      tap(_ => LoggerService.log('fetched users', _)),
      catchError(LoggerService.handleError('users', undefined))
    );
  }

  save(user: User): Observable<User[]> {
    return this.http.post<User[]>(USER_URL, user, httpOptions).pipe(
      tap(users => {
        LoggerService.log('saved user', user);
        this.usersEvent.emit(users);
        this.dialogService.successMessage('Usuário Adicionado!');
      }),
      catchError(LoggerService.handleError('saved user', undefined))
    );
  }

  update(user: User): Observable<User[]> {
    return this.http.put<User[]>(USER_URL, user, httpOptions).pipe(
      tap(users => {
        LoggerService.log('updated user', user);
        this.usersEvent.emit(users);
        this.dialogService.successMessage('Usuário Atualizado!');
      }),
      catchError(LoggerService.handleError('updated user', undefined))
    );
  }

  delete(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${USER_URL}/${id}`).pipe(
      tap(users => {
        LoggerService.log('deleted user', id);
        this.usersEvent.emit(users);
        this.dialogService.successMessage('Usuário Deletado!');
      }),
      catchError(LoggerService.handleError('deleted user', undefined))
    );
  }
}
