import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css'],
})
export class DashbardComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  navigateRout(path: string) {
    switch (path) {
      case 'addStudent':
        this.router.navigate(['student/addStudent']);
        break;
      case 'studentDetails':
        this.router.navigate(['student/studentDetails']);
        break;
      case 'addTeacher':
        this.router.navigate(['teacher/addTeacher']);
        break;
      case 'teacherDetails':
        this.router.navigate(['teacher/teacherDetails']);
        break;
      case 'addQuestion':
        this.router.navigate(['question/addQuestion']);
        break;
      case 'questionDetails':
        this.router.navigate(['question/questionDetails']);
        break;
      case 'courseStatus':
        this.router.navigate(['teacher/courseStatus']);
        break;
      case 'assign-details':
        this.router.navigate(['assignment/assign-details']);
        break;
      default:
        console.log('default');
    }
  }
}
