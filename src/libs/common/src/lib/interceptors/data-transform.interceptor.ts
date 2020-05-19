import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class DataTransformInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      body:{
        data:request.body,
      }
    });
    return next.handle(request)
                .pipe(
                  map((event: HttpEvent<any>)=>{
                    if(event instanceof HttpResponse){
                      event = event.clone({
                        body:event.body.data || event.body.error,
                      });
                    }
                    return event;
                  })
                );
  }
}
