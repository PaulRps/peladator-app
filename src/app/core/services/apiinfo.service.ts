import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

const API_INFO_URL = `${environment.apiUrl}/info`;

@Injectable({
  providedIn: 'root',
})
export class APIInfoService {
  private apiInfo = new BehaviorSubject<any>({});
  private apiInfoObservable = this.apiInfo.asObservable();

  constructor(private http: HttpClient) {
    this.http.get(`${API_INFO_URL}/build`).subscribe(response => {
      this.apiInfo.next(response);
      console.log(response);
    });
  }

  public get APIInfo(): Observable<any> {
    return this.apiInfoObservable;
  }
}
