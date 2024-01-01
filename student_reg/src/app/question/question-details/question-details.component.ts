import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionMeta } from './questionMeta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  questionHeader: any = [];
  questionData: any = [];
  allClasses: any = [];
  subjectList: any = [];
  chapterDetails: any = [];
  questionDetailsForm!: FormGroup;
  editQuestionSetting: any = {};
  editItem: any;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionHeader = QuestionMeta;
    this.getClasses();
    this.questionDetailsForm = this.fb.group({
      className: ['', Validators.required],
      subject: ['', Validators.required],
      chapterName: ['', Validators.required],
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

  getChapterList(value: any) {
    let payload = {
      classId: this.questionDetailsForm.controls['className'].value,
      orgId: sessionStorage.getItem('orgId'),
      subjectId: value,
    };
    this.questionService.getChaptersList(payload).subscribe({
      next: (res: any) => {
        this.chapterDetails = res.data;
        // console.log(this.chapterDetails);
      },
    });
  }

  selectedClass(value: any) {
    this.getSubject(value);
  }

  selectedSubject(value: any) {
    this.getChapterList(value);
  }

  onSubmit() {
    let payload = {
      classId: this.questionDetailsForm.controls['className'].value,
      orgId: sessionStorage.getItem('orgId'),
      subjectId: this.questionDetailsForm.controls['subject'].value,
      chapterId: this.questionDetailsForm.controls['chapterName'].value,
      body: {
        createdBy: 'Subham',
        level: 6001,
        status: 'PendingApproved',
      },
    };
    if (this.questionDetailsForm.valid) {
      this.questionService.getQuestionList(payload).subscribe({
        next: (res: any) => {
          // console.log(res);
          const result = res.data.map((val: any) => {
            return {
              ...val,
              disabledIcon: {
                approve: true,
              },
            };
          });
          this.questionData = [...result];
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  editQuestion(item: any) {
    this.editQuestionSetting = {
      ...this.editQuestionSetting,
      isOpen: true,
      size: 'xl',
      title: 'Edit Question',
    };
    this.editItem = item;
  }

  deleteQuestion(id: any) {
    this.questionService.deleteQuestion(id).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.onSubmit();
        this.alertService.showSuccessToast({
          msg: 'Question Deleted Success Fully',
        });
      },
      error: () => {
        this.alertService.showErrorToast({ msg: 'something went wrong' });
      },
    });
  }

  approveQuestion(item: any) {
    let payload = {
      approvalStatus: 'APPROVED',
      approvedBy: 'Subham1',
      questionId: item.questionId,
    };
    this.questionService.approveQuestion([payload]).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.showSuccessToast({
          msg: 'Question Approved Success Fully',
        });
      },
      error: () => {
        this.alertService.showErrorToast({ msg: 'something went wrong' });
      },
    });
  }

  closeModal(event: any) {
    if (event) {
      this.onSubmit();
    }
    this.editQuestionSetting = { ...this.editQuestionSetting, isOpen: false };
  }

  getAction(action: any) {
    // console.log(action);
    switch (action.type) {
      case 'edit':
        this.editQuestion(action.data);
        break;
      case 'delete':
        this.deleteQuestion(action.data.questionId);
        break;
      case 'approve':
        this.approveQuestion(action.data);
        break;
      default:
        console.log('default');
    }
  }
}
