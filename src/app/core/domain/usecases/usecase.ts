import { Observable } from 'rxjs';

export interface Usecase<P, R> {
  execute(param: P): Observable<R>;
}
