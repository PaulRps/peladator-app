import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export class LoggerService {
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error && error.message) {
        LoggerService.log(`${operation} failed: ${error.message}`, error);
      }
      return throwError(result as T);
    };
  }

  public static log(message: string, object: any) {
    if (!environment.production) {
      console.log(message, object);
    }
  }
}
