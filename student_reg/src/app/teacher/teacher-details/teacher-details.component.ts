import { Component, OnInit } from '@angular/core';
import { TeacherMeta } from './teacherMeta';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit{
  teacherHeader:any;
  teacherData:any = [];
  editModalSetting:any = {};
  viewModalSetting:any = {}
  editData:any;
  viewData:any;
  allClasses: any = [];

  constructor(
    private router: Router,
    private teacherService : TeacherService,
    private questionService: QuestionService
  ){}

  ngOnInit(): void {
    this.teacherHeader = TeacherMeta;
    this.allTeacherList();
    this.getClasses();
   }

   allTeacherList() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      role: 'Teacher',
    }
    this.teacherService.getAllTeacher(payload).subscribe({
      next:(res:any)=>{
        this.teacherData = res.data;
        console.log(this.teacherData);
      },
      error: (err: any) => {
      },
    });
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

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  editStudent(data:any){
    this.editModalSetting = {...this.editModalSetting,
      isOpen:true,size: 'md',
    title:'Edit Teacher'};
    this.editData = data;
  }

  viewStudent(data:any){
    this.viewModalSetting = {...this.viewModalSetting,
      isOpen:true,size: 'md',isFooter:true,
    title:'View Teacher'};
    this.viewData = data;
  }

  closeModal(event:any){
    if(event){
      this.allTeacherList();
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
}
