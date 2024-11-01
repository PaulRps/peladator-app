import { Observable } from 'rxjs';
import { Fixture } from '../models/fixture';
import { FixtureCriteria } from '../models/fixture-criteria';

export interface IFixtureRepository {
  getLatest(): Observable<Fixture>;
  create(fixture: FixtureCriteria): Observable<Fixture>;
}

export namespace IFixtureRepository {
  export const name = 'IFixtureRepository';
}
