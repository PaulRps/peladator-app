import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.currentToken;
    if (jwt && jwt.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${jwt.type} ${jwt.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
