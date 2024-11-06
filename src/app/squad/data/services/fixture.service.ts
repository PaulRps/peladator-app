import { Injectable } from '@angular/core';
import { FixtureCriteria } from '../../domain/models/fixture-criteria';
import { Observable } from 'rxjs';
import { Fixture } from '../../domain/models/fixture';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FixtureService {
  private readonly url = `${environment.apiUrl}/api/v1/fixture`;
  constructor(private readonly http: HttpClient) {}

  createFixture(criteria: FixtureCriteria): Observable<Fixture> {
    criteria.squadId = environment.squadId;
    return this.http.post<Fixture>(`${this.url}`, criteria);
  }

  getLatestFixture(): Observable<Fixture> {
    return this.http.get<Fixture>(`${this.url}/latest?squadId=${environment.squadId}`);
  }

  updateFixture(fixture: Fixture): Observable<void> {
    fixture.squadId = environment.squadId;
    return this.http.put<void>(`${this.url}`, fixture);
  }
}


