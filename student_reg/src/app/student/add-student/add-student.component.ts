import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { StudentService } from 'src/app/services/student.service';
import {UtilsService} from 'src/app/utils/common-methods.service'

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  submitted: boolean = false;
  registrationForm!: FormGroup;
  allClasses: any = [];
  subjectList: any = [];
  email_pattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  relationArray: any = [
    { id: 1, relationshipType: 'Father' ,group:'fatherGroup'},
    { id: 2, relationshipType: 'Mother' ,group:'motherGroup'},
    { id: 3, relationshipType: 'Others' ,group:'otherGroup'},
  ];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private modalService: NgbModal,
    private studentService: StudentService,
    private questionService: QuestionService,
    private utilService : UtilsService
  ) {
  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(25)]],
      email: ['', [Validators.required,Validators.pattern(this.email_pattern),Validators.maxLength(25)]],
      rollNum: ['', [Validators.required,Validators.maxLength(10)]],
      className: ['', Validators.required],
      subject: new FormArray([], this.minSelectedCheckboxes(1)),
      relationStatus: new FormArray([], [Validators.required]),
      fatherGroup: this.fb.group({
        name: [''],
        email: [''],
        pno: [''],
      }),
      motherGroup: this.fb.group({
        name: [''],
        email: [''],
        pno: [''],
      }),
      otherGroup: this.fb.group({
        name: [''],
        email: [''],
        pno: [''],
      }),
    });
    this.getClasses();
  }

  get f() {
    return this.registrationForm['controls'];
  }

  validationGroup(group:any): any | null{
    return (this.f[group] as FormGroup).controls
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registrationForm);
    if (this.registrationForm.valid) {
      const selectedOrderIds = this.registrationForm.value.subject
        .map((checked: any, i: any) => (checked ? this.subjectList[i] : null))
        .filter((v: any) => v !== null);

      let api_data = selectedOrderIds.map((val: any) => {
        return {
          classId: this.registrationForm.controls['className'].value,
          subjectId: val.dropdownKey,
        };
      });

      const res = this.registrationForm.controls['relationStatus'].value;
      let relData:any = [];
      this.relationArray.forEach((ele:any)=>{
        if(res.includes(ele.relationshipType)){
          relData.push({
          emailId:this.registrationForm.controls[ele.group].get('email')?.value,
          mobileNo:this.registrationForm.controls[ele.group].get('pno')?.value,
          name:this.registrationForm.controls[ele.group].get('name')?.value,
          relationshipType:ele.relationshipType,
        });
        }
      });
      let payload = {
        name: this.registrationForm.controls['name'].value,
        extId: this.registrationForm.controls['rollNum'].value,
        emailId: this.registrationForm.controls['email'].value,
        orgId: sessionStorage.getItem('orgId'),
        role: 'Student',
        userName: sessionStorage.getItem('userName'),
        classSubjectCreateDTOs: api_data,
        relationships: relData,
      };
      console.log(payload);
      this.addStudent([payload]);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  addStudent(payload: any) {
    this.studentService.addStudent(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.alertService.showSuccessToast({
          msg: 'New student added successfully....!',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.alertService.showErrorToast({ msg: 'Something went wrong....!' });
      },
    });
  }

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
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
      },
    });
  }

  selectDeselect(value: boolean) {
    let selectedOrderIds: any;
    if (value) {
      selectedOrderIds = this.subjectList.map(() => true);
    } else {
      selectedOrderIds = this.subjectList.map(() => false);
    }
    this.registrationForm.patchValue({
      subject: selectedOrderIds,
    });
    // console.log(selectedOrderIds);
  }

  addCheckboxes() {
    if (this.subjectList && this.subjectList.length > 0) {
      this.subjectList.forEach(() => this.t.push(new FormControl(false)));
    }
  }

  get t() {
    return this.registrationForm.controls['subject'] as FormArray;
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }
      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.registrationForm.get(
      'relationStatus'
    ) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    const res = this.registrationForm.controls['relationStatus'].value;
    this.relationArray.filter((ele:any)=>{
      if(!res.includes(ele.relationshipType)){
      this.registrationForm.controls[ele.group].reset();
      this.registrationForm.controls[ele.group].get('name')?.clearValidators();
      this.registrationForm.controls[ele.group].get('email')?.clearValidators();
      this.registrationForm.controls[ele.group].get('pno')?.clearValidators();
      }else{
          this.validationGroup(ele.group)['name'].addValidators([Validators.required,Validators.maxLength(25)])
          this.validationGroup(ele.group)['email'].addValidators([Validators.required,Validators.maxLength(25),Validators.pattern(this.email_pattern)])
          this.validationGroup(ele.group)['pno'].addValidators([Validators.required,Validators.maxLength(10)])
      }
        this.validationGroup(ele.group)['name'].updateValueAndValidity();
        this.validationGroup(ele.group)['email'].updateValueAndValidity();
        this.validationGroup(ele.group)['pno'].updateValueAndValidity();
    });
  }

  getFormGroup(group:any){
    const res = this.registrationForm.controls['relationStatus'].value;
    if(res && res.length){
      return res.includes(group);
    }
    return false;
  }

  textOnly(event:any){
    return this.utilService.textOnly(event);
  }
  numberOnly(event:any){
    return this.utilService.numberOnly(event);
  }
}
