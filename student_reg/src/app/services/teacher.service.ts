import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Observable } from 'rxjs';
import { Api_Url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService{
  apiUrl:string ='http://localhost:3000/';
  url:any = Api_Url

  addTeacher(payload:any){
    return this.post(`${this.url}user/addUser`,payload);
  }
  getAllTeacher(payload:any){
    return this.get(`${this.url}user/listUserDetail?classId=${payload.classId}&name=${payload.name}&orgId=${payload.orgId}&role=${payload.role}`);
  }
  updateTeacher(payload:any):Observable<any>{
    return this.put(`${this.url}user/updateUserDetail`,payload);
  }
  getChapterStatus(payload:any){
    return this.get(`${this.url}Question/getChapterStatus?classId=${payload.classId}&orgId=${payload.orgId}&subjectId=${payload.subjectId}`);
  }

  updateChapter(payload:any){
    return this.put(`${this.url}Question/updateChapterStatus`,payload);
  }
}
