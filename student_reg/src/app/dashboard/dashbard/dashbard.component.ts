import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css'],
})
export class DashbardComponent {
  userRole:any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole');
  }

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
      case 'report':
        this.router.navigate(['assignment/report']);
        break;
      default:
        console.log('default');
    }
  }

  get studentRole(){
    return this.userRole === 'Student';
  }

  get teacherRole(){
    return this.userRole === 'Teacher';
  }

  get adminRole(){
    return this.userRole === 'Admin';
  }

  get parentRole(){
    return this.userRole === 'guardian';
  }

}
