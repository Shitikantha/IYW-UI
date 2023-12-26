import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  headerInfo:any = [];
  constructor(private router: Router,private studentService : StudentService) { }

  ngOnInit(): void {
    let user:any = sessionStorage.getItem("userName");
    const result = user.split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    this.userName = result[0]
    this.getHeaderInfo();
  }
  getHeaderInfo(){
    let orgId = sessionStorage.getItem('orgId')
    this.studentService.getHeaderInfo(orgId).subscribe((res:any)=>{
      this.headerInfo = res;
    })
  }
logout(){
  sessionStorage.clear();
  this.router.navigate(['/']);
}
}
