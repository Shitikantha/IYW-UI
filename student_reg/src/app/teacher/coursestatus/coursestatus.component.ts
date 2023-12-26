import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-coursestatus',
  templateUrl: './coursestatus.component.html',
  styleUrls: ['./coursestatus.component.css'],
})
export class CoursestatusComponent implements OnInit{
  pending:any = [];
  completed:any = [];
  chapterDetails:any = [];

  allClasses: any = [];
  subjectList: any = [];
  selectedClassId:any;
  selectedSubjectId:any;

  constructor(private router: Router,
    private teacherService : TeacherService,
    private questionService: QuestionService){}

  ngOnInit(): void {
    this.getClasses();
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

  selectedClass(event:any){
    this.selectedClassId = event.target.value;
    this.getSubject();
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
    // console.log(this.todo);
    // console.log(this.done);
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }
}
