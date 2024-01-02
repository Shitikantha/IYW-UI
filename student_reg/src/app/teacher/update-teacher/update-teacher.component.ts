import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { StudentService } from 'src/app/services/student.service';
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
  subjectForm!:FormGroup;
  submitted:boolean = false;
  email_pattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  allClasses: any = [];
  subjectList: any = [];
  currentTab:any = 'basic';
  classSubject:any = [];
  settings = {
    singleSelection: false,
    idField: 'dropdownKey',
    textField: 'dropdownValue',
    enableCheckAll: true,
    maxHeight: 197,
    itemsShowLimit: 3,
    defaultOpen:false,
    noDataAvailablePlaceholderText: 'No Data Available',
  };

  constructor(private fb:FormBuilder,
    private alertService:AlertService,private teacherService : TeacherService,
    private utilsService:UtilsService,private questionService: QuestionService,
    private studentService : StudentService,) { 
    this.updateProfile = this.fb.group({
      teacherName:['',[Validators.required,Validators.maxLength(25)]],
      email:['',[Validators.required,Validators.maxLength(25),Validators.pattern(this.email_pattern),]],
      teacherNo:['']
    })
  }

  get f(){
    return this.updateProfile['controls'];
  }


  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      cla_group: new FormArray([])
    });
    this.getClasses();
  }

  get clsGroup() { return this.subjectForm.controls['cla_group'] as FormArray; };
  
  getReferrals(index: any): FormGroup {
    const formGroup = this.clsGroup.controls[index] as FormGroup;
    return formGroup;
  }

  addClassSubject(){
    this.clsGroup.push(
      this.fb.group({
        class: ['', Validators.required],
        subject: ['', Validators.required],
      })
    );
    this.classSubject.push({className:'',subjectName:'',isAdd:true});
    console.log(this.classSubject);
  }

  saveSubject(item:any,index:number){
    if(this.clsGroup.controls[index].valid){
      let classData:any = this.allClasses.find((item:any)=>
      item.dropdownKey == this.clsGroup.controls[index].get('class')?.value).dropdownValue
      item.isAdd = false;
      item.className = classData;
      item.subjectName = this.clsGroup.controls[index].get('subject')?.value.map((val:any)=>val.dropdownValue).join(',');
      let subject = this.clsGroup.controls[index].get('subject')?.value;
      let payload = subject.map((item:any)=>{
        return {
          "classId": this.clsGroup.controls[index].get('class')?.value,
          "subjectId": item.dropdownKey
        }
      });
      this.addClaSubject(payload,this.updateData.userId);
    }
  }

  addClaSubject(payload:any,id:any){
    this.studentService.addClassSubject(payload,id).subscribe({
      next: (result: any) => {
        console.log(result);
        this.alertService.showSuccessToast({msg:'ClassSubject Added ....!'});
        this.getUserDetails();
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }

  getUserDetails(){
    this.studentService.getUserDetails(this.updateData.userId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.updateData = result.data;
        this.basicReload();
        },
     });
  }

  basicReload(){
    this.classSubject = this.updateData.classSubjects.map((val:any)=>{
      return {...val,className:val.classes.name,
        subjectName:!Array.isArray(val.subject)?val.subject.name:val.subject.map((ele:any)=>ele.name).join(',')}
    });

    this.classSubject.forEach((val:any)=>{
      this.clsGroup.push(
        this.fb.group({
          class: [val.className, Validators.required],
          subject: [val.subjectName, Validators.required],
        })
      );
    });
  }

  deleteClass(item:any){
    this.studentService.deleteClassSubject(item.id).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'Relation Deleted Success Fully ....!'});
        this.getUserDetails();
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }

  cancelSubject(item:any,index:number){
    const controls = this.subjectForm.get('cla_group') as FormArray
    controls.removeAt(index);
    this.classSubject.splice(index,1);
  }

  onSubmit(){
    this.submitted = true;
    if(this.updateProfile.valid){
      this.updateTeacher();
    }
  }

  cancel(){
    this.close.emit(false);
  }

  updateTeacher(){
    let payload ={
      userName:this.updateProfile.controls['teacherName'].value,
      emailId:this.updateProfile.controls['email'].value,
      userId:this.updateData.userId,
      mobileNo: this.updateProfile.controls['teacherNo'].value,
    }
    console.log(payload);
   
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

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        this.basicReload()
        if(this.updateData){
          if(Object.keys(this.updateData).length > 0){
            this.patchValue(this.updateData);
          }
        }
      },
    });
  }

  patchValue(formValue:any){
    this.updateProfile.patchValue({
      teacherName:formValue?.userName,
      email:formValue?.emailId,
      teacherNo :formValue?.mobileNo
    });
  }

  selectedClass(value: any) {
    this.subjectList = [];
    this.getSubject(value);
  }

  getSubject(selectClass: any) {
    let payload = {
      classId: selectClass,
      orgId: sessionStorage.getItem('orgId'),
    };
    this.questionService.getSubjectList(payload).subscribe({
      next: (res: any) => {
        // this.subjectList = res.data;
        let subjectList:any = res.data;
        // console.log(this.subjectList);
        // console.log(this.classSubject);
        let allSelectedSub = [...new Set(this.classSubject.map((val:any)=>val.subjectName))];
        let remainingSub = this.subjectList.filter((ele:any)=>!allSelectedSub.includes(ele.dropdownValue));
        this.subjectList = [...remainingSub];
        this.settings = {...this.settings,noDataAvailablePlaceholderText: 'You Selected All The Subject',}
      },
    });
  }

  tabDetails(tab:any){
    this.currentTab = tab
  }

  numberOnly(event:any){
    return this.utilsService.numberOnly(event);
  }
}
