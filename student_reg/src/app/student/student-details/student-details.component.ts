import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentMeta } from './studentMeta';
import { StudentService } from 'src/app/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit , OnDestroy{
  studentHeader:any;
  studentData:any = [];
  editModalSetting:any = {};
  viewModalSetting:any = {}
  editData:any;
  viewData:any;
  allClasses: any = [];
  selectedClassId:any;
  text = new Subject<string>();
  term:any;

  constructor(
    private alertService:AlertService,
    private router: Router,
    private studentService : StudentService,
    private questionService: QuestionService
    ) {}
  ngOnDestroy(): void {
    this.text.complete();
  }

  ngOnInit(): void {
   this.studentHeader = StudentMeta;
  //  this.allStudentList();
   this.getClasses();
   this.text.pipe(
    debounceTime(400))
    .subscribe(value => {
      this.term = value;
      this.allStudentList();
    });
  }

  allStudentList() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      classId:this.selectedClassId || '',
      name:this.term || '',
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
      isOpen:true,size: 'lg',
    title:'Edit Student',isFooter:true};
    this.editData = data;
  }

  viewStudent(data:any){
    this.viewModalSetting = {...this.viewModalSetting,
      isOpen:true,size: 'lg',isFooter:true,
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
    // console.log(action);
    switch (action.type) {
      case 'view':
        this.viewStudent(action.data);
        break;
      case 'edit':
        this.editStudent(action.data);
        break;
      case 'delete':
        this.deleteStudent(action.data);
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
        this.allStudentList();
      },
    });
  }

  SelectClass(event:any){
    // console.log(event.target.value);
    this.selectedClassId = event.target.value;
    this.allStudentList()
  }

  deleteStudent(item:any){
    this.alertService
    .showConfirmMsg({
      text: 'You Want to Delete',
      title: 'Are you sure?',
      icon: 'warning',
    }).then((result)=>{
      if(result.isConfirmed){
        this.studentService.deleteUser(item.userId).subscribe({
          next: (result: any) => {
            this.allStudentList();
            this.alertService.showSuccessToast({msg:'Student Deleted Success Fully ....!'});
            },
            error: (err: any) => {
              this.alertService.showErrorToast({msg:'Something went wrong....!'});
            },
         });
      }
    })
   
  }

  getText(event:any){
    this.text.next(event.target.value);
  }

}
