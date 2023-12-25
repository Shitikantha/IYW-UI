import { Component, OnInit } from '@angular/core';
import { StudentMeta } from './studentMeta';
import { StudentService } from 'src/app/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{
  studentHeader:any;
  studentData:any = [];
  editModalSetting:any = {};
  viewModalSetting:any = {}
  editData:any;
  viewData:any;
  allClasses: any = [];

  constructor(
    private alertService:AlertService,
    private router: Router,
    private studentService : StudentService,
    private questionService: QuestionService
    ) {}

  ngOnInit(): void {
   this.studentHeader = StudentMeta;
   this.allStudentList();
   this.getClasses();
  }

  allStudentList() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      role: 'Student',
    }
    this.studentService.getAllStudents(payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.studentData = res.data;
      },
      error: (err: any) => {
      },
    });
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  editStudent(data:any){
    this.editModalSetting = {...this.editModalSetting,
      isOpen:true,size: 'md',
    title:'Edit Student'};
    this.editData = data;
  }

  viewStudent(data:any){
    this.viewModalSetting = {...this.viewModalSetting,
      isOpen:true,size: 'md',isFooter:true,
    title:'View Student'};
    this.viewData = data;
  }

  closeModal(event:any){
    if(event){
      this.allStudentList();
    }
    this.editModalSetting = {...this.editModalSetting,isOpen:false}
    this.viewModalSetting = {...this.viewModalSetting,isOpen:false}
  }

  getAction(action: any) {
    console.log(action);
    switch (action.type) {
      case 'view':
        this.viewStudent(action.data);
        break;
      case 'edit':
        this.editStudent(action.data);
        break;
      default:
        console.log('default');
    }
  }

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
      },
    });
  }

}
