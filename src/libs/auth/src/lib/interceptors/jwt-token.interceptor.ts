import { JwtAuthService } from './../services/jwt-auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { sharedEnvironment as environment } from "@workspace/environments"
import { Observable } from 'rxjs';

@Injectable({
  providedIn:"root"
})
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private jwtAuthService: JwtAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.jwtAuthService.token;
    if(!token || !request.url.match(environment.url)){
      return next.handle(request);
    }
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}
