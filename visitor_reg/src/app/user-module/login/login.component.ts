import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted:boolean=false;
  userDetail: any;
  constructor(private router: Router ,private fb:FormBuilder,
    private loginService:LoginService,
    private alertService:AlertService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email : ['',Validators.required],
      Pwd : ['',Validators.required],
    });
  }
  
  get f(){
    return this.loginForm['controls'];
  }

  onSubmit(){
    this.submitted = true;
    this.getUserDetails();
    if(this.userDetail!=null){
      //sessionStorage.setItem('userName', this.loginForm.controls['Email'].value);
      sessionStorage.setItem('userName', this.userDetail.userDisplayName);
      this.alertService.showSuccessToast({msg:'Login has been successfully'});
      this.router.navigate(['/visitor']);
    }else{
    this.alertService.showErrorToast({msg:'Login Failed'});
    }
  }

  getUserDetails(){
    let payload ={
      "password": this.loginForm.controls['Pwd'].value,
        "userName": this.loginForm.controls['Email'].value
    }
      this.loginService.signIn(payload).subscribe((res:any)=>{
      this.userDetail = res.data;
    });
  }
}
