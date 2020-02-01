import { LoggerService } from './../services/logger.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.currentToken;
    if (jwt && jwt.value) {
      LoggerService.log(`url: ${request.url} jwt: `, jwt);
      request = request.clone({
        setHeaders: {
          Authorization: `${jwt.type} ${jwt.value}`,
        },
      });
    }

    return next.handle(request);
  }
}
