import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  @Input() updateData:any;
  @Output() close:EventEmitter<any>= new EventEmitter();
  updateProfile:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,private activeModal : NgbActiveModal,
    private alertService:AlertService,private studentService : StudentService) { 
    this.updateProfile = this.fb.group({
      studentName:['',[Validators.required,Validators.maxLength(25)]],
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
      this.updateStudent();
    }
  }

  patchValue(formValue:any){
    this.updateProfile.patchValue({
      studentName:formValue?.studentName,
      rollNum:formValue?.rollNum,
      contactNumber:formValue?.contactNo,
    });
  }

  cancel(){
    this.close.emit(false);
  }

  updateStudent(){
    let payload ={
      studentName:this.updateProfile.controls['studentName'].value,
      rollNum:this.updateProfile.controls['rollNum'].value,
      contactNumber:this.updateProfile.controls['contactNumber'].value,
      id:this.updateData.id
    }
   
     this.studentService.updateStudent(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'Student Details Updated ....!'});
        this.close.emit(true);
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }
}
