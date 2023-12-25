import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-assign-class-to-teacher',
  templateUrl: './assign-class-to-teacher.component.html',
  styleUrls: ['./assign-class-to-teacher.component.css']
})
export class AssignClassToTeacherComponent implements OnInit{
  @Input() editData:any;
  @Output() close:EventEmitter<any>= new EventEmitter();
  @Output() sendClassDetails:EventEmitter<any>= new EventEmitter();

  submitted:boolean=false;
  addClass:FormGroup;
  allClasses: any = [];
  subjectList:any = [];

  constructor(private fb:FormBuilder,
    private questionService: QuestionService){
    this.addClass = this.fb.group({
      className:["",Validators.required],
      subject:new FormArray([],this.minSelectedCheckboxes(1)),
    })
  }

  addCheckboxes() {
    if(this.subjectList && this.subjectList.length > 0){
      this.subjectList.forEach(()=>this.t.push(new FormControl(false)));
    }
  }

  get t() {
    return this.addClass.controls['subject'] as FormArray;
  }

  selectedClass(value:any){
    this.subjectList = [];
    this.t.clear();
    this.getSubject(value);
  }

  ngOnInit(): void {
    this.getClasses();
  }

  get f(){
    return this.addClass['controls'];
  }

  getClasses() {
    let orgId:any = sessionStorage.getItem("orgId");
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
        if(!!this.editData){
          this.addClass.patchValue({
            className:this.allClasses.find((val:any)=>val.dropdownValue == this.editData.className).dropdownKey,
          });
        }
      },
    });
  }

  getSubject(selectClass:any){
    let payload = {
      classId:selectClass,
      orgId:sessionStorage.getItem("orgId")
    }
    this.questionService.getSubjectList(payload).subscribe({
      next: (res: any) => {
        this.subjectList = res.data;
        // console.log(this.subjectList);
        this.addCheckboxes();
        if(!!this.editData){
          let checkBoxSetData = this.editData.subject.split(',');
        const selectedOrderIds = this.subjectList.map((checked:any) => checkBoxSetData.includes(checked.dropdownValue))
          this.addClass.patchValue({
            subject:selectedOrderIds
          });
        }
       
      },
    });
  }

  onSubmit(){
    this.submitted = true;
    const selectedOrderIds = this.addClass.value.subject
      .map((checked:any, i:any) => checked ? this.subjectList[i]: null)
      .filter((v:any) => v !== null);
    let selectedClassName = this.allClasses.find((val:any)=>val.dropdownKey == this.addClass.controls['className'].value);
    let api_data = selectedOrderIds.map((val:any)=>{
      return { classId: selectedClassName.dropdownKey,subjectId: val.dropdownKey}
    });
    let payload = {
      className : selectedClassName.dropdownValue,
      subject : selectedOrderIds.map((val:any)=>val.dropdownValue).toString(),
      api_data : api_data
    }
    // console.log(payload);
    this.sendClassDetails.emit(payload);
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

  cancel(){
    this.close.emit(false);
  }
}
