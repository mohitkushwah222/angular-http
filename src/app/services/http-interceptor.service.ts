import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  isLoader: boolean = true;
  constructor(
  ) {
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length > 0) {
      // show progress bar
    } else {
      // hide progress bar
    }
    // hide loader if called from a component and request get aborted
    if (this.requests.length === 0 && this.isLoader) {
      // hide loader
    }
    console.log("No of requests---> " + this.requests.length);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    console.log("No of requests---> " + this.requests.length);
    // show progress bar
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(request);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.removeRequest(request);
        return throwError(error);
      }),
      // for hide progress bar if request aborted
      finalize(() => {
        this.removeRequest(request);
      }));
  }
}
