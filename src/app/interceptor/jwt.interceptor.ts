import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private inject:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authServe = this.inject.get(AuthService)
    let jwtToken = request.clone({
      setHeaders:{
        Authorization: 'bearer '+authServe.getToken(),
      }
    })
    return next.handle(jwtToken);
  }
}
