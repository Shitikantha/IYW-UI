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
  visitorApiUrl:string ='http://ec2-3-111-55-219.ap-south-1.compute.amazonaws.com:8080/api/visitor/'
  userApiUrl:string ='http://ec2-3-111-55-219.ap-south-1.compute.amazonaws.com:8080/api/user/'


  addVisitors(payload:any){
    return this.post(`${this.visitorApiUrl}addVisitor`,payload);
  }
  getAllVisitors(){
    return this.get(`${this.visitorApiUrl}listAllVisitor`);
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
  getAptMembers(){
    return this.get(`${this.userApiUrl}listUserByName?name=`);
  }
  getHeaderInfo(){
    return this.get(`${this.apiUrl}headerInfo`);
  }
}
