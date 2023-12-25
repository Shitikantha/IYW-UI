import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  @Input() editRecords: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  submitted: boolean = false;
  questionForm: FormGroup;
  allClasses: any = [];
  subjectList: any = [];
  chapterDetails: any = [];
  selectedType!: string;
  allQuestions: any = [];
  levels: any = [];
  questionTypeArr: any = [];
  questionList: any = [];
  mChoiceModalSetting: any = {};
  questionData: any = [];
  editData: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private questionService: QuestionService
  ) {
    this.questionForm = this.fb.group({
      className: ['', Validators.required],
      chapterName: ['', Validators.required],
      questionType: ['', Validators.required],
      subject: ['', Validators.required],
      levels: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getClasses();
    if(this.editRecords){
      console.log(this.editRecords);
      this.patchValue(this.editRecords);
    }
  }
  get f() {
    return this.questionForm['controls'];
  }

  onSubmit() {
    this.submitted = true;
    if (this.isSubmitted) {
      let payload = {
        classId: this.questionForm.controls['className'].value,
        chapterId: this.questionForm.controls['chapterName'].value,
        questionType: this.questionForm.controls['questionType'].value,
        subjectId: this.questionForm.controls['subject'].value,
        level: this.questionForm.controls['levels'].value,
        orgId: sessionStorage.getItem('orgId'),
        createdBy: 'Subham',
        questionHeading: this.selectedType,
      };
      
      if(this.editRecords){
        let data = this.allQuestions.map((item: any) => {
          return { ...item, ...payload ,questionId:this.editRecords.questionId};
        });
        this.updateQuestion(data[0]);
      }else{
        let data = this.allQuestions.map((item: any) => {
          return { ...item, ...payload };
        });
        this.addQuestion(data);
      }
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getClasses() {
    let orgId: any = sessionStorage.getItem('orgId');
    this.questionService.getAllClasses(orgId).subscribe({
      next: (res: any) => {
        this.allClasses = res.data;
        // console.log(this.allClasses);
        if(this.editRecords){
          this.questionForm.patchValue({
            className: this.allClasses.find(
              (val: any) => val.dropdownValue == this.editRecords.className
            ).dropdownKey,
          });
        }
        this.getLevels();
        this.getQuestionType();
      },
    });
  }

  getSubject() {
    let payload = {
      classId: this.questionForm.controls['className'].value,
      orgId: sessionStorage.getItem('orgId'),
    };
    this.questionService.getSubjectList(payload).subscribe({
      next: (res: any) => {
        this.subjectList = res.data;
        // console.log(this.subjectList);
        if(this.editRecords){
          this.questionForm.patchValue({
            subject: this.subjectList.find((val:any)=>val.dropdownValue == this.editRecords.subject).dropdownKey,
          });
        }
      },
    });
  }

  getChapterList() {
    let payload = {
      classId: this.questionForm.controls['className'].value,
      orgId: sessionStorage.getItem('orgId'),
      subjectId: this.questionForm.controls['subject'].value,
    };
    this.questionService.getChaptersList(payload).subscribe({
      next: (res: any) => {
        this.chapterDetails = res.data;
        if(this.editRecords){
          this.questionForm.patchValue({
            chapterName: this.chapterDetails.find((val:any)=>val.dropdownValue == this.editRecords.chapter).dropdownKey,
          });
        }
        // console.log(this.chapterDetails);
      },
    });
  }

  getLevels() {
    this.questionService.getDifficultyLevels().subscribe({
      next: (res: any) => {
        this.levels = res.data;
        // console.log(this.levels);
        if(this.editRecords){
          this.questionForm.patchValue({
            levels: this.levels.find(
        (val: any) => val.dropdownValue == this.editRecords.level
      ).dropdownKey,
          });
        }
      },
    });
  }

  getQuestionType() {
    this.questionService.getQuestionType().subscribe({
      next: (res: any) => {
        this.questionTypeArr = res.data;
        // console.log(this.questionTypeArr);
        if(this.editRecords){
          this.questionForm.patchValue({
            questionType: this.questionTypeArr.find(
              (val: any) => val.dropdownValue == this.editRecords.questionType
            ).dropdownKey,
          });
        }
      },
    });
  }

  selectedClass() {
    this.getSubject();
  }

  selectedSubject() {
    this.getChapterList();
  }

  selectedQuestionType(value: any) {
    if (this.questionTypeArr && this.questionTypeArr.length > 0) {
      this.selectedType = this.questionTypeArr.find(
        (ele: any) => ele.dropdownKey == value
      ).dropdownValue;
    }
  }

  addMultiQuestion() {
    this.mChoiceModalSetting = {
      ...this.mChoiceModalSetting,
      isOpen: true,
      size: 'xl',
      title: 'Add Multiple Choice',
    };
  }

  closeModal(event: any) {
    this.mChoiceModalSetting = { ...this.mChoiceModalSetting, isOpen: false };
  }

  open() {
    this.addMultiQuestion();
  }

  getAllQuestions(questions: any) {
    console.log(questions);
    if (this.allQuestions && this.allQuestions.length > 0 && !this.editRecords) {
      questions.forEach((val: any) => this.allQuestions.push(val));
    } else {
      this.allQuestions = [...questions];
    }
    this.mChoiceModalSetting = { ...this.mChoiceModalSetting, isOpen: false };
  }

  addQuestion(payload: any) {
    this.questionService.addQuestion(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allQuestions = [];
        this.alertService.showSuccessToast({
          msg: 'Question Added Success Fully',
        });
      },
      error: () => {
        this.alertService.showErrorToast({ msg: 'something went wrong' });
      },
    });
  }

  updateQuestion(payload: any){
    this.questionService.updateQuestion(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allQuestions = [];
        this.alertService.showSuccessToast({
          msg: 'Question Updated Success Fully',
        });
        this.close.emit(true);
      },
      error: () => {
        this.alertService.showErrorToast({ msg: 'something went wrong' });
      },
    })
  }
  get isSubmitted() {
    return this.allQuestions.length > 0;
  }

  selectedOption(value: any) {
    return value.map((val: any) => val.optionText).toString();
  }
  selectedValue(value: any) {
    return value.find((val: any) => val.isCorrect).optionText;
  }
  edit(data: any) {
    // console.log(data);
    this.mChoiceModalSetting = {
      ...this.mChoiceModalSetting,
      isOpen: true,
      size: 'xl',
      title: 'Add Multiple Choice',
    };
    this.editData = data;
  }

  patchValue(formValue: any) {
    this.questionForm.disable();
    this.allQuestions.push(formValue);
  }

  cancel() {
    this.close.emit(false);
  }
}
