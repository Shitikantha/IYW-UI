import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { UtilsService } from 'src/app/utils/common-methods.service';

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
  email_pattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  allClasses: any = [];
  subjectList: any = [];

  constructor(private fb:FormBuilder,
    private alertService:AlertService,private teacherService : TeacherService,
    private utilsService:UtilsService,private questionService: QuestionService) { 
    this.updateProfile = this.fb.group({
      teacherName:['',[Validators.required,Validators.maxLength(25)]],
      email:['',[Validators.required,Validators.maxLength(25),Validators.pattern(this.email_pattern),]],
      className:['',Validators.required],
      subject: new FormArray([],this.utilsService.minSelectedCheckboxes(1)),
    })
  }

  get f(){
    return this.updateProfile['controls'];
  }


  ngOnInit(): void {
    this.getClasses();
  }

  onSubmit(){
    this.submitted = true;
    if(this.updateProfile.valid){
      this.updateTeacher();
    }
  }

  patchValue(formValue:any){
    let classDetails = formValue.classSubjects[0]?.classes;
    this.updateProfile.patchValue({
      teacherName:formValue?.userName,
      email:formValue?.emailId,
      className:this.allClasses.find((val:any)=>val.dropdownKey == classDetails.classId).dropdownKey,
    });
  }

  cancel(){
    this.close.emit(false);
  }

  updateTeacher(){
    const selectedOrderIds = this.updateProfile.value.subject
      .map((checked:any, i:any) => checked ? this.subjectList[i]: null)
      .filter((v:any) => v !== null);
    console.log(selectedOrderIds);
    let payload ={
      teacherName:this.updateProfile.controls['teacherName'].value,
      email:this.updateProfile.controls['email'].value,
      className:this.updateProfile.controls['className'].value,
      userId:this.updateData.userId
    }
    console.log(payload);
   
    //  this.teacherService.updateTeacher(payload).subscribe({
    //   next: (result: any) => {
    //     this.alertService.showSuccessToast({msg:'Teacher Details Updated ....!'});
    //     this.close.emit(true);
    //     },
    //     error: (err: any) => {
    //       this.alertService.showErrorToast({msg:'Something went wrong....!'});
    //     },
    //  });
  }

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
        if(this.updateData){
          if(Object.keys(this.updateData).length > 0){
            this.patchValue(this.updateData);
          }
        }
      },
    });
  }

  selectedClass(value: any) {
    this.subjectList = [];
    this.t.clear();
    this.getSubject(value);
  }

  getSubject(selectClass: any) {
    let payload = {
      classId: selectClass,
      orgId: sessionStorage.getItem('orgId'),
    };
    this.questionService.getSubjectList(payload).subscribe({
      next: (res: any) => {
        this.subjectList = res.data;
        // console.log(this.subjectList);
        this.addCheckboxes();

        if(this.updateData){
          let subject = [this.updateData.classSubjects[0]?.subject].map((val:any)=>val.subjectId);
          const selectedOrderIds = this.subjectList.map((checked:any) => subject.includes(checked.dropdownKey));
          this.updateProfile.patchValue({
            subject: selectedOrderIds,
          });
        }
      },
    });
  }

  addCheckboxes() {
    if (this.subjectList && this.subjectList.length > 0) {
      this.subjectList.forEach(() => this.t.push(new FormControl(false)));
    }
  }

  get t() {
    return this.updateProfile.controls['subject'] as FormArray;
  }
}
