import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent {
  @Input() updateData:any;
  @Output() close:EventEmitter<any>= new EventEmitter();
  updateProfile:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,
    private alertService:AlertService,private teacherService : TeacherService) { 
    this.updateProfile = this.fb.group({
      teacherName:['',[Validators.required,Validators.maxLength(25)]],
      rollNum:['',[Validators.required,Validators.maxLength(25)]],
      contactNumber:['',[Validators.required,Validators.maxLength(10)]],
    })
  }

  get f(){
    return this.updateProfile['controls'];
  }


  ngOnInit(): void {
    if(this.updateData){
      if(Object.keys(this.updateData).length > 0){
        this.patchValue(this.updateData);
      }
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.updateProfile.valid){
      this.updateTeacher();
    }
  }

  patchValue(formValue:any){
    this.updateProfile.patchValue({
      teacherName:formValue?.teacherName,
      rollNum:formValue?.rollNum,
      contactNumber:formValue?.contactNo,
    });
  }

  cancel(){
    this.close.emit(false);
  }

  updateTeacher(){
    let payload ={
      teacherName:this.updateProfile.controls['teacherName'].value,
      rollNum:this.updateProfile.controls['rollNum'].value,
      contactNumber:this.updateProfile.controls['contactNumber'].value,
      id:this.updateData.id
    }
   
     this.teacherService.updateTeacher(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'Teacher Details Updated ....!'});
        this.close.emit(true);
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }
}
