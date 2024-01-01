import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Api_Url } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  apiUrl:string ='http://localhost:3000/';
  url:any = Api_Url

  getLoginUserDetails(){
    return this.get(`${this.apiUrl}users`);
  }

  signIn(payload:any):Observable<any>{
    return this.post(`${this.url}user/signIn`,payload);
}

}
