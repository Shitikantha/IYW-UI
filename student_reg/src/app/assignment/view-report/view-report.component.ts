import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ReportService } from 'src/app/services/report.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { MonthlyMeta } from './monthlyMeta';
import { ProgressMeta } from './progressMeta';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit{
  @Input() viewData:any;
  currentTab:any = 'Monthly';
  pending:any = [];
  completed:any = [];
  chapterDetails:any = [];

  // allClasses: any = [];
  subjectList: any = [];
  selectedClassId:any;
  selectedSubjectId:any;

  monthlyHeader:any = [];
  monthlyData:any = [];
  progressHeader:any = [];
  progressData:any = [];

  constructor(
    private teacherService : TeacherService,
    private questionService: QuestionService,
    private reportService:ReportService){}

  ngOnInit(): void {
    this.tabDetails(this.currentTab);
  }

  tabDetails(tab:any){
    this.currentTab = tab;
    switch (tab) {
      case 'Course':
        this.selectedClassId = this.viewData.classId;
        this.getSubject();
        break;
      case 'Assignment':
        break;
      case 'Monthly':
        this.monthlyHeader = MonthlyMeta;
        this.getAssessmentMonthlyDetails();
        break;
      case 'report':
        this.progressHeader = ProgressMeta;
        this.getPercentageReport();
        break;
      default:
        console.log('default');
    }
  }

  allCourseStatus() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      classId:this.selectedClassId,
      subjectId:this.selectedSubjectId
    }
    this.teacherService.getChapterStatus(payload).subscribe({
      next:(res:any)=>{
        console.log(res.data);
        this.chapterDetails = res.data;
        this.pending = this.chapterDetails.filter((val:any)=>val.status == 'Pending').map((ele:any)=>ele.name);
        this.completed = this.chapterDetails.filter((val:any)=>val.status == 'Completed').map((ele:any)=>ele.name);
      },
      error: (err: any) => {
      },
    });
  }

  selectedSubject(event:any){
    this.selectedSubjectId = event.target.value;
    this.allCourseStatus();
  }

  getSubject() {
    let payload = {
      classId: this.selectedClassId,
      orgId: sessionStorage.getItem('orgId'),
    };
    this.questionService.getSubjectList(payload).subscribe({
      next: (res: any) => {
        this.subjectList = res.data;
        // console.log(this.subjectList);
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getAssessmentMonthlyDetails(){
    this.reportService.getMonthlyAssessmentReport(this.viewData.userId).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.monthlyData = res.data;
      },
    });
  }
  getPercentageReport(){
    this.reportService.getPercentageReport(this.viewData.userId).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.progressData = res.data;
      },
    });
  }
}
