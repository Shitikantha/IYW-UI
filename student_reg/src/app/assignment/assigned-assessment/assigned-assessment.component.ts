import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-assigned-assessment',
  templateUrl: './assigned-assessment.component.html',
  styleUrls: ['./assigned-assessment.component.css']
})
export class AssignedAssessmentComponent implements OnInit,OnDestroy{
  @Input() assignment:any;
  @Output() sendAssessment: EventEmitter<any> = new EventEmitter();
  countDown!: Subscription;
  totalDuration:any = 1200;
  counter = 20 * 60;

  constructor(private questionService: QuestionService,
    private assignmentService:AssignmentService,
    private alertService: AlertService,){}

  allQuestionArray:any=[];

  ngOnInit(): void {
    console.log(this.assignment);
    this.getQuestionSet();
    if(this.allQuestionArray.length){
      this.countDown = timer(0, 1000).subscribe((res) => {
        --this.counter;
        if (this.counter === 0) {
          this.countDown.unsubscribe();
          this.save();
        }
      });
    }
  }

  checkQuestionValue(opt:any){
    opt.isCorrect = true;
  }

  isCompleted(options:[]){
    return options.some((val:any)=>val.isCorrect)
  }

  get isDisabled(){
    return !this.allQuestionArray.every((val:any)=>val.options.some((ele:any)=>ele.isCorrect))
  }

  getQuestionSet(){
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      assignmentId:this.assignment.assignmeId,
      classSubjectChapterId:this.assignment.classSubjectChapterId,
      level:this.assignment.levelId
    };
    this.questionService.generateQuestionSet(payload).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.allQuestionArray = res.data.questionDTOs
      },
    });
  }
  

  save(){
    let answer:any = [];
    this.allQuestionArray.forEach((val:any)=>{
      answer.push({"optionId": val.options.find((ele:any)=>ele.isCorrect).questionOptionId,"questionId": val.questionId});
    });

    let payload = {
      assignmeId: this.assignment.assignmeId,
      duration: this.totalDuration - this.counter,
      questionTestDTOs:answer
    }
    console.log(payload);
    this.submitAssignments(payload);
    // console.log(this.counter);
  }

  submitAssignments(payload:any){
    this.assignmentService.submitAssignments(payload).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.alertService.showSuccessToast({
          msg: 'Assignment Completed Success Fully',
        });
        this.countDown.unsubscribe();
        this.sendAssessment.emit(true)
      },
      error: () => {
        this.alertService.showErrorToast({ msg: 'something went wrong' });
      },
    });
  }

  ngOnDestroy(): void {
    if(this.allQuestionArray.length){
    this.countDown.unsubscribe();
    }
  }

}
