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
    return this.get(`${this.url}user/listUserDetail?classId=${payload.classId}&name=Suh&orgId=${payload.orgId}&role=${payload.role}`);
  }
  updateStudent(payload:any):Observable<any>{
    return this.put(`${this.url}user/updateUserDetail`,payload);
  }
  getHeaderInfo(orgId:any){
    return this.get(`${this.apiUrl}headerInfo`);
  }

  // getHeaderInfo(orgId:any){
  //   return this.get(`${this.url}getOrgByOrgId?orgId=${orgId}`);
  // }

  deleteUser(id:any){
    return this.delete(`${this.url}user/deleteUser/${id}`);
  }

  addRelation(payload:any,userId:any){
    return this.post(`${this.url}user/addRelationship/${userId}`,payload);
  }

  addClassSubject(payload:any,userId:any){
    return this.post(`${this.url}user/addClassSubject/${userId}`,payload);
  }

  deleteRelation(id:any){
    return this.delete(`${this.url}user/deleteUserRelationship/${id}`);
  }

  deleteClassSubject(id:any){
    return this.delete(`${this.url}Question/deleteUserClassSubject/${id}`);
  }

  getUserDetails(id:any){
    return this.delete(`${this.url}user/getUserDetail/${id}`);
  }
}
