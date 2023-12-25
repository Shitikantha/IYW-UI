import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base.service';
import { Api_Url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService{
  apiUrl:string ='http://localhost:3000/';
  url:any = Api_Url

  getAllClasses(orgId:any){
    return this.get(`${this.url}Question/getClassList?orgId=${orgId}`);
  }

  getSubjectList(payload:any){
    return this.get(`${this.url}Question/getSubjectList?classId=${payload.classId}&orgId=${payload.orgId}`);
  }
  getChaptersList(payload:any){
    return this.get(`${this.url}Question/getChaptersList?classId=${payload.classId}&orgId=${payload.orgId}&subjectId=${payload.subjectId}`);
  }
  getDifficultyLevels(){
    return this.get(`${this.url}Question/getDropdownValue?key=difficulty_levels`);
  }
  getQuestionType(){
    return this.get(`${this.url}Question/getDropdownValue?key=question_type`);
  }

  addQuestion(payload:any){
    return this.post(`${this.url}Question/addQuestion`,payload);
  }

  updateQuestion(payload:any){
    return this.put(`${this.url}Question/updateQuestion`,payload)
  }

  deleteQuestion(id:any){
    return this.delete(`${this.url}Question/deleteQuestion/${id}`);
  }

  approveQuestion(payload:any){
    return this.put(`${this.url}Question/approveQuestion`,payload)
  }

  getQuestionList(payload:any){
    return this.post(`${this.url}Question/getQuestionList?chapterId=${payload.chapterId}
    &classId=${payload.classId}&orgId=${payload.orgId}&subjectId=${payload.subjectId}`,payload.body);
  }
}
