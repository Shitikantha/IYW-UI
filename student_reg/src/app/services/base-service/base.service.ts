import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http:HttpClient) { }


  get(url:any):Observable<any>{
    return this.http.get<any>(url);
  }

  post(url:any,body:any):Observable<any>{
    return this.http.post<any>(url,body);
  }

  patch(url:any,body:any):Observable<any>{
    return this.http.patch<any>(url,body);
  }

  put(url:any,body:any):Observable<any>{
    return this.http.put<any>(url,body);
  }

  delete(url:any):Observable<any>{
    return this.http.delete<any>(url);
  }
}
