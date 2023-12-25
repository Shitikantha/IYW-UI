import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css'],
})
export class MultipleChoiceComponent implements OnInit {
  questionForm!: FormGroup;
  submitted: boolean = false;
  @Input() editData:any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() sendQuestions: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      multipleChoice: new FormArray([]),
    });

    if(this.editData){
      this.patchValue(this.editData);
    }else{
      this.addQuestion();
    }
  }

  get t() {
    return this.questionForm.controls['multipleChoice'] as FormArray;
  }
  optionsControl(i: any) {
    return this.t.controls[i].get('options') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.questionForm);
    if (this.questionForm.valid) {
      this.sendQuestions.emit(this.questionForm.value['multipleChoice']);
    }
  }

  addQuestion() {
    this.t.push(
      this.fb.group({
        questionText: ['', Validators.required],
        options: new FormArray([],this.customValidator()),
      })
    );
    if(this.t.length){
      this.addOptions(this.t.length-1);
    }
  }

  addOptions(i: any): void {
    this.optionsControl(i).push(
      this.fb.group({
        optionText: ['', Validators.required],
        isCorrect: [false],
      })
    );
  }

  onRadioChange(index: number, cIndex: number) {
    const formArray = this.t.at(index).get('options') as FormArray;

    // Set all items to false
    formArray.controls.forEach((control, i) => {
      if (i !== cIndex) {
        control.get('isCorrect')!.setValue(false);
      }
    });
  }

  getReferralsFormArr(index: any): FormGroup {
    const formGroup = this.t.controls[index] as FormGroup;
    return formGroup;
  }

  getReferralsOption(index: any, childIndex: any): FormGroup {
    const formGroup = this.optionsControl(index).controls[
      childIndex
    ] as FormGroup;
    return formGroup;
  }

  deleteOption(pIndex: any, cIndex: any) {
    this.optionsControl(pIndex).removeAt(cIndex);
  }

  patchValue(formValue:any){
    let options = formValue.options.map((val:any,i:any)=>{
      return this.fb.group({
         optionText: val.optionText,
         isCorrect: val.isCorrect,
         questionOptionId: val.questionOptionId
       })
   });
    this.t.push(
      this.fb.group({
        questionText: formValue.questionText,
        options: new FormArray([...options]),
      })
    );
  }

  customValidator(): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      const isValid = formArray.value.some((val:any)=> val.isCorrect);
      if (!isValid) {
        return { customError: true };
      }
      return null;
    };
  }

  cancel() {
    this.close.emit(false);
  }
}
