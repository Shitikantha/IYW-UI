import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  logo_url:any = '/assets/img/school.png';
  resetSetting:any;
  resetForm!: FormGroup;
  constructor(private router: Router,private studentService : StudentService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    let user:any = sessionStorage.getItem("userName");
    const result = user.split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    this.userName = result[0];
    this.resetForm = this.fb.group({
      pwd:['']
    })
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

openReset(){
  this.resetSetting = {
    ...this.resetSetting,
    isOpen: true,
    size: 'md',
    title: 'Reset Password',
  }
}

close(event:any){
  this.resetSetting = {
    ...this.resetSetting,
    isOpen: false,
  };
}

onSubmit(){
  
}
}
