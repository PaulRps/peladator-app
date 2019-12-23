import { Observable, of } from 'rxjs';

export class Logger {
    public static handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            if (error && error.message) {
                console.error(error); // log to console instead
                Logger.log(`${operation} failed: ${error.message}`, error);
            }
            return of(result as T);
        };
    }

    public static log(message: string, object: any) {
        console.log(message, object);
    }
}
