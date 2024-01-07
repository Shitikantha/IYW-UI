import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeacherMeta } from './teacherMeta';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { QuestionService } from 'src/app/services/question.service';
import { Subject, debounceTime} from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit,OnDestroy{
  teacherHeader:any;
  teacherData:any = [];
  editModalSetting:any = {};
  viewModalSetting:any = {}
  editData:any;
  viewData:any;
  allClasses: any = [];
  selectedClassId:any;
  text = new Subject<string>();
  term:any;

  constructor(
    private router: Router,
    private teacherService : TeacherService,
    private questionService: QuestionService,
    private studentService : StudentService,
    private alertService:AlertService
  ){}

  ngOnDestroy(): void {
    this.text.complete();
  }

  ngOnInit(): void {
    this.teacherHeader = TeacherMeta;
    // this.allTeacherList();
    this.getClasses();
    this.text.pipe(
      debounceTime(400))
      .subscribe(value => {
        this.term = value;
        this.allTeacherList();
      });
   }

   allTeacherList() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      classId:this.selectedClassId || '',
      role: 'Teacher',
      name:this.term || ''
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
        this.allTeacherList();
      },
    });
  }

  SelectClass(event:any){
    // console.log(event.target.value);
    this.selectedClassId = event.target.value;
    this.allTeacherList()
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  editStudent(data:any){
    this.editModalSetting = {...this.editModalSetting,
      isOpen:true,size: 'lg',
    title:'Edit Teacher',isFooter:true};
    this.editData = data;
  }

  viewStudent(data:any){
    this.viewModalSetting = {...this.viewModalSetting,
      isOpen:true,size: 'lg',isFooter:true,
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
        case 'delete':
        this.deleteTeacher(action.data);
        break;
      default:
        console.log('default');
    }
  }

  getText(event:any){
    this.text.next(event.target.value);
  }

  deleteTeacher(item:any){
    this.alertService
      .showConfirmMsg({
        text: 'You Want to Delete',
        title: 'Are you sure?',
        icon: 'warning',
      })
      .then((result) => {
        if(result.isConfirmed){
          this.studentService.deleteUser(item.userId).subscribe({
            next: (result: any) => {
              this.allTeacherList();
              this.alertService.showSuccessToast({msg:'Teacher Deleted Success Fully ....!'});
              },
              error: (err: any) => {
                this.alertService.showErrorToast({msg:'Something went wrong....!'});
              },
           });
        }
      });
   
   
  }
}
