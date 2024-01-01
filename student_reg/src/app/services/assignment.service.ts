import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Api_Url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService extends BaseService{

  url:any = Api_Url

  getAssignmentsDetails(payload:any){
    return this.get(`${this.url}Question/getAssignments?orgId=${payload.orgId}&status=${payload.status}&studentId=${payload.studentId}`);
  }

  submitAssignments(payload:any){
    return this.post(`${this.url}Question/assignmentTest`,payload);
  }

  viewAssignments(id:any){
    return this.get(`${this.url}Question/viewAssignmentTest?assignmentId=${id}`);
  }
}
