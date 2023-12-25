import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddClassMeta } from './addClassMeta';
import { UtilsService } from 'src/app/utils/common-methods.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit{
  submitted:boolean=false;
  registrationForm:FormGroup;
  addClassSetting:any = {};
  addedClass:any = [];
  editData!:any;
  addClassHeader:any= [];
  api_dataForClass:any = [];
  email_pattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private fb:FormBuilder,
    private alertService:AlertService,
    private router: Router,
    private teacherService : TeacherService,
    private utilService : UtilsService
    ) {
    this.registrationForm = this.fb.group({
      name:["",[Validators.required,Validators.maxLength(25)]],
      email:["",[Validators.required,Validators.maxLength(25),Validators.pattern(this.email_pattern)]],
      contactNo:["",[Validators.required,Validators.maxLength(10)]],
    })
  }
  ngOnInit(): void {
    this.addClassHeader = AddClassMeta
  }

  get f(){
    return this.registrationForm['controls'];
  }


  onSubmit(){
    this.submitted = true;
    if(this.registrationForm.valid){
      let payload = {
        name:this.registrationForm.controls['name'].value,
        emailId:this.registrationForm.controls['email'].value,
        mobileNo:this.registrationForm.controls['contactNo'].value,
        orgId: sessionStorage.getItem('orgId'),
        role: "Teacher",
        userName: sessionStorage.getItem('userName'),
        classSubjectCreateDTOs:this.api_dataForClass
      }
      console.log(payload);
      this.addTeacher([payload]);
    }
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  addTeacher(payload:any){
    this.teacherService.addTeacher(payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.alertService.showSuccessToast({msg:'New teacher added successfully....!'});
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.alertService.showErrorToast({msg:'Something went wrong....!'});
      },
    });
  }

  openAddClass(){
    this.addClassSetting = {...this.addClassSetting,
      isOpen:true,size: 'sm',
    title:'Add Class'};
  }

  editAddClass(item:any){
    if(item.type == 'edit'){
      this.addClassSetting = {...this.addClassSetting,
        isOpen:true,size: 'sm',
      title:'Add Class'};
      this.editData = item.data;
    }else{
      this.addedClass = this.addedClass.filter((val:any)=>val.className != item.data.className);
    }
  }

  closeModal(event:any){
    this.addClassSetting = {...this.addClassSetting,isOpen:false}
  }

  getSelectedClassDetails(item:any){
    // console.log(item);
    this.api_dataForClass = item.api_data;
    if(this.addedClass.length){
      this.addedClass.forEach((ele:any)=>{
        if(ele.className == item.className){
          this.addedClass = this.addedClass.filter((val:any)=>val.className !== item.className);
        }
      });
      this.addedClass.push(item);
    }else{
      this.addedClass.push(item);
    }
    // console.log(this.addedClass);
    this.addClassSetting = {...this.addClassSetting,isOpen:false}
  }

  textOnly(event:any){
    return this.utilService.textOnly(event);
  }
  numberOnly(event:any){
    return this.utilService.numberOnly(event);
  }

}
