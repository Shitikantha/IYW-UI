import { Injectable } from '@angular/core';
import { Api_Url } from 'src/environments/environment';
import { BaseService } from './base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{
  url:any = Api_Url;

  getReportDetails(id:any){
    return this.get(`${this.url}user/getChildUserDetails?parentUserId=${id}`);
  }

  getMonthlyAssessmentReport(id:any){
    return this.get(`${this.url}Question/getMonthlyAssignmentReport?userId=${id}`);
  }

  getPercentageReport(id:any){
    return this.get(`${this.url}Question/getPercentageReport?userId=${id}`);
  }
}
