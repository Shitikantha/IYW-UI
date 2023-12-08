import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  
  // userApiUrl:string ='http://localhost:8080/api/user/'
   userApiUrl:string ='http://ec2-user@ec2-13-232-2-230.ap-south-1.compute.amazonaws.com:8080/api/user/'


  signIn(payload:any):Observable<any>{
       return this.post(`${this.userApiUrl}signIn`,payload);
  }

}
