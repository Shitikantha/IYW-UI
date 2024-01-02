import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { ReportService } from 'src/app/services/report.service';
import { ReportMeta } from './reportMeta';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  allClasses: any = [];
  selectedClassId: any;
  reportHeader: any = [];
  reportData: any = [];
  reportSetting: any;
  viewData: any;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private reportService: ReportService,
    private studentService : StudentService,
  ) {}

  ngOnInit(): void {
    this.getClasses();
    this.reportHeader = ReportMeta;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        this.reportDetails();
        // console.log(this.allClasses);
      },
    });
  }

  SelectClass(event: any) {
    this.selectedClassId = event.target.value;
    this.allStudentList();
  }

  reportDetails() {
    this.reportService
      .getReportDetails(sessionStorage.getItem('userId'))
      .subscribe({
        next: (res: any) => {
          this.reportData = res.data.map((val: any) => {
            return {
              ...val,className:val.classSubjects[0].classes.name,
              classId:val.classSubjects[0].classes.classId,
              disabledIcon: {
                'view Report': true,
              },
            };
          });
        },
      });
  }

  allStudentList() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      classId:this.selectedClassId,
      name:'',
      role: 'Student',
    }
    this.studentService.getAllStudents(payload).subscribe({
      next:(res:any)=>{
        this.reportData = res.data.map((val: any) => {
          return {
            ...val,className:val.classSubjects[0].classes.name,
            classId:val.classSubjects[0].classes.classId,
            disabledIcon: {
              'view Report': true,
            },
          };
        });
      },
      error: (err: any) => {
      },
    });
  }

  getAction(action: any) {
    console.log(action);
    switch (action.type) {
      case 'view Report':
        this.openReport(action.data);
        break;
      default:
        console.log('default');
    }
  }

  closeModal(event: any) {
    this.reportSetting = {
      ...this.reportSetting,
      isOpen: false,
    };
  }

  openReport(item: any) {
    this.reportSetting = {
      ...this.reportSetting,
      isOpen: true,
      isFooter: true,
      size: 'lg',
      title: 'Report Details',
    };
    this.viewData = item;
  }
}
