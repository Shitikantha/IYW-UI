import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { StudentService } from 'src/app/services/student.service';
import { UtilsService } from 'src/app/utils/common-methods.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  @Input() updateData:any;
  @Output() close:EventEmitter<any>= new EventEmitter();
  updateProfile:FormGroup;
  relationForm!:FormGroup;
  subjectForm!:FormGroup;
  submitted:boolean = false;
  email_pattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  allClasses: any = [];
  subjectList: any = [];
  currentTab:any = 'basic';
  relationTableData:any = [];
  relationArray: any = [
    { id: 1, relationshipType: 'Father' },
    { id: 2, relationshipType: 'Mother'},
    { id: 3, relationshipType: 'Others'},
  ];
  classSubject:any = [];
  settings = {
    singleSelection: false,
    idField: 'dropdownKey',
    textField: 'dropdownValue',
    enableCheckAll: true,
    limitSelection: -1,
    maxHeight: 197,
    itemsShowLimit: 3,
    defaultOpen: false,
  };

  constructor(private fb:FormBuilder,private activeModal : NgbActiveModal,
    private alertService:AlertService,private studentService : StudentService,
    private questionService: QuestionService, private utilsService:UtilsService) { 
    this.updateProfile = this.fb.group({
      studentName:['',[Validators.required,Validators.maxLength(25)]],
      studentNo:[''],
      email:['',[Validators.required,Validators.maxLength(25),Validators.pattern(this.email_pattern),]],
    });

  }

  get f(){
    return this.updateProfile['controls'];
  }

  get relGroup() { return this.relationForm.controls['rel_group'] as FormArray; };
  get clsGroup() { return this.subjectForm.controls['cla_group'] as FormArray; };
  getReferralsFormArr(index: any): FormGroup {
    const formGroup = this.relGroup.controls[index] as FormGroup;
    return formGroup;
  }

  getReferrals(index: any): FormGroup {
    const formGroup = this.clsGroup.controls[index] as FormGroup;
    return formGroup;
  }

  addRow(): void {
    this.relGroup.push(
      this.fb.group({
        Name: ['', Validators.required],
        Email: ['', Validators.required],
        mobile: ['', Validators.required],
        type: ['',Validators.required],
      })
    );
    this.relationTableData.push({relationshipType:'',userName:'',mobileNo:'',emailId:'',isEdit:true});
    console.log(this.relGroup);
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


  onEdit(item:any,index:number){
    item.isEdit = true;
    this.patchRelValue(item,index);
  }

  onSave(item:any,index:number){
    if(this.relGroup.controls[index].valid){
      item.isEdit = false;
      item.userName = this.relGroup.controls[index].get('Name')?.value;
      item.emailId = this.relGroup.controls[index].get('Email')?.value;
      item.mobileNo = this.relGroup.controls[index].get('mobile')?.value;
      item.relationshipType = this.relGroup.controls[index].get('type')?.value;
      this.patchRelValue(item,index);
      this.addRelation({
        "emailId": item.emailId,
        "mobileNo": item.mobileNo,
        "name": item.userName,
        "relationshipType": item.relationshipType
    },this.updateData.userId);
    }
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

  onDelete(item:any,index:number){
    // console.log('delete',item);
    this.studentService.deleteRelation(item.id).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'Relation Deleted Success Fully ....!'});
        this.getUserDetails();
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }

  onCancel(item:any,index:number){
    const controls = this.relationForm.get('rel_group') as FormArray
    controls.removeAt(index);
    this.relationTableData.splice(index,1);
  }
  cancelSubject(item:any,index:number){
    const controls = this.subjectForm.get('cla_group') as FormArray
    controls.removeAt(index);
    this.classSubject.splice(index,1);
  }

  patchRelValue(formValue:any,index:number){
    this.relGroup.controls[index].patchValue([{
      Name:formValue.userName,
      Email:formValue.emailId,
      mobile:formValue.mobileNo,
      type:this.relationArray.find((val:any)=>val.relationshipType === formValue.relationshipType).relationshipType
    }]);
  }


  ngOnInit(): void {
    console.log(this.updateData);
    this.relationForm = this.fb.group({
      rel_group: new FormArray([])
    });
    this.subjectForm = this.fb.group({
      cla_group: new FormArray([])
    });
    this.getClasses();
  }

  basicReload(){
    this.relationTableData = this.updateData.relationships.map((val:any)=>{
      return {...val,...val.relatedUserDetail}
    });
    this.classSubject = this.updateData.classSubjects.map((val:any)=>{
      return {...val,className:val.classes.name,
        subjectName:!Array.isArray(val.subject)?val.subject.name:val.subject.map((ele:any)=>ele.name).join(',')}
    });

    this.relationTableData.forEach((val:any)=>{
      this.relGroup.push(
        this.fb.group({
          Name: [val.userName, Validators.required],
          Email: [val.emailId, Validators.required],
          mobile: [val.mobileNo, Validators.required],
          type: [val.relationshipType,Validators.required],
        })
      );
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

  onSubmit(){
    this.submitted = true;
    if(this.updateProfile.valid){
      this.updateStudent();
    }
  }

  patchValue(formValue:any){
    this.updateProfile.patchValue({
      studentName:formValue?.userName,
      email:formValue?.emailId,
      studentNo :formValue?.mobileNo
    });
  }

  cancel(){
    this.close.emit(false);
  }

  updateStudent(){
    let payload ={
      userName:this.updateProfile.controls['studentName'].value,
      emailId:this.updateProfile.controls['email'].value,
      userId:this.updateData.userId,
      mobileNo: this.updateProfile.controls['studentNo'].value,
    }
    console.log(payload);
   
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

  getUserDetails(){
    this.studentService.getUserDetails(this.updateData.userId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.updateData = result.data;
        this.basicReload();
        },
     });
  }

  addRelation(payload:any,id:any){
     this.studentService.addRelation([payload],id).subscribe({
      next: (result: any) => {
        console.log(result);
        this.alertService.showSuccessToast({msg:'Relation Added ....!'});
        this.getUserDetails();
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
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

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
        this.basicReload();
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
      },
    });
  }

  tabDetails(tab:any){
    this.currentTab = tab
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

  textOnly(event:any){
    return this.utilsService.textOnly(event);
  }
  numberOnly(event:any){
    return this.utilsService.numberOnly(event);
  }

}
