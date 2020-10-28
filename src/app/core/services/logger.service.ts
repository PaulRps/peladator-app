import { Observable, throwError } from 'rxjs';
import { LogLevel } from 'src/app/shared/models/log.level.enum';
import { environment } from 'src/environments/environment';

export class LoggerService {
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      const msg = error?.message || error;
      if (msg) {
        if (typeof msg === 'object' && msg !== null) {
          LoggerService.error(`${operation} failed: ${msg}`, msg);
        } else {
          LoggerService.error(`${operation} failed: ${msg}`);
        }
      }
      return throwError(result as T);
    };
  }

  public static error(message: string, object?: any) {
    this.log(LogLevel.ERROR, message, object);
  }

  public static info(message: string, object?: any) {
    this.log(LogLevel.INFO, message, object);
  }

  public static debug(message: string, object?: any) {
    this.log(LogLevel.DEBUG, message, object);
  }

  private static log(level: LogLevel, message: string, object?: any) {
    if (environment.logging.level >= level) {
      console.log(LogLevel[level], message, object);
    }
  }
}
