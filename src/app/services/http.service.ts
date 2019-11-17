import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
export interface APIResponse {
  status: number,
  message: string,
  data: any,
  errorCode: number

}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(endPoint: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.get(endPoint, httpOptions).pipe(
      map(res => {
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  post(endPoint: string, data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http
      .post<APIResponse>(endPoint, body, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
  upload(endPoint: string, formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({})
    };
    return this.http
      .post<APIResponse>(endPoint, formData, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  put(endPoint: string, data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.put(endPoint, body, httpOptions).pipe(
      map(res => {
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  delete(endPoint: string, data: any): Observable<any> {
    const headers = { "Content-Type": "application/json" };
    const body = {
      headers: headers,
      body: JSON.stringify(data)
    };
    return this.http.delete(endPoint, body).pipe(
      map(res => {
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
