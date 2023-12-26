import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Observable } from 'rxjs';
import { Api_Url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{
  apiUrl:string ='http://localhost:3000/';
  url:any = Api_Url;

  addStudent(payload:any){
    return this.post(`${this.url}user/addUser`,payload);
  }
  getAllStudents(payload:any){
    return this.get(`${this.url}user/listUserDetail?classId=2001&name=Suh&orgId=${payload.orgId}&role=${payload.role}`);
  }
  updateStudent(payload:any):Observable<any>{
    return this.patch(`${this.apiUrl}Student/${payload.id}`,payload);
  }
  getHeaderInfo(orgId:any){
    return this.get(`${this.apiUrl}headerInfo`);
  }

  // getHeaderInfo(orgId:any){
  //   return this.get(`${this.url}getOrgByOrgId?orgId=${orgId}`);
  // }
}
