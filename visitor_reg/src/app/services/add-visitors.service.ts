import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddVisitorsService extends BaseService{
  apiUrl:string ='http://localhost:3000/'
  #visitorApiUrl:string ='http://localhost:8080/api/visitor/'
  #userApiUrl:string ='http://localhost:8080/api/user/'
  #orgApiUrl:string ='http://localhost:8080/api/org/'
  
  visitorApiUrl:string ='http://ec2-user@ec2-13-232-2-230.ap-south-1.compute.amazonaws.com:8080/api/visitor/'
  userApiUrl:string ='http://ec2-user@ec2-13-232-2-230.ap-south-1.compute.amazonaws.com:8080/api/user/'
  orgApiUrl:string ='http://ec2-user@ec2-13-232-2-230.ap-south-1.compute.amazonaws.com:8080/api/org/'
  


  addVisitors(payload:any){
    return this.post(`${this.visitorApiUrl}addVisitor`,payload);
  }
  getAllVisitors(payload:any){
    return this.get(`${this.visitorApiUrl}listAllVisitor?endDate=${payload.toDate}&startDate=${payload.formDate}&userName=${payload.userName}`);
  }
  updateVisitors(payload:any):Observable<any>{
    // return this.patch(`${this.apiUrl}Visitors/${payload.id}`,payload);
    return this.patch(`${this.visitorApiUrl}updateVisitorDetail`,payload);
  }
  approveVisitor(payload:any):Observable<any>{
    // return this.patch(`${this.apiUrl}Visitors/${payload.id}`,payload);
    return this.patch(`${this.visitorApiUrl}approveVisitor`,payload);
  }

  checkOutVisitor(payload:any):Observable<any>{
    // return this.patch(`${this.apiUrl}Visitors/${payload.id}`,payload);
    return this.patch(`${this.visitorApiUrl}checkout${payload.visitorId}`,payload);
  }
  getAptMembers(orgId:string,name:string){
    return this.get(`${this.userApiUrl}listUserByName?orgId=${orgId}&name=${name}`);
  }
  getHeaderInfo(orgId:string){
    return this.get(`${this.orgApiUrl}getOrgByOrgId?orgId=${orgId}`);
  }
}
