import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
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
  submitted: boolean = false;
  constructor(private router: Router,private studentService : StudentService,
    private fb: FormBuilder,private loginService : LoginService,
    private alertService:AlertService) { }
 
  ngOnInit(): void {
    let user:any = sessionStorage.getItem("userName");
    const result = user.split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    this.userName = result[0];
    this.resetForm = this.fb.group({
      pwd:['',Validators.required],
      cifPwd:['',[Validators.required]],
    },
    {
      validator: this.ConfirmPasswordValidator("pwd", "cifPwd"),
    })
    this.getHeaderInfo();
  }

  get f() {
    return this.resetForm['controls'];
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
    isFooter:true
  }
}

close(event:any){
  this.resetSetting = {
    ...this.resetSetting,
    isOpen: false,
  };
  this.resetForm.reset();
}

onSubmit(){
  this.submitted = true;
  let payload = {
      "password": this.resetForm.controls['pwd']?.value,
      "userSigninId": sessionStorage.getItem('userId')
  }
  if(this.resetForm.valid){
    // console.log(payload);
    this.loginService.resetPwd(payload).subscribe(({
      next:(res:any)=>{
        this.alertService.showSuccessToast({msg:'Password Reset successfully....!'});
        this.close(false);
      },
      error: (err: any) => {
        this.alertService.showErrorToast({msg:'Something went wrong....!'});
      },
    }));
  }
}

ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup?.controls[controlName];
    let matchingControl = formGroup?.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


}
