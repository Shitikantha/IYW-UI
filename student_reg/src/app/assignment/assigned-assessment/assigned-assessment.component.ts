import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-assigned-assessment',
  templateUrl: './assigned-assessment.component.html',
  styleUrls: ['./assigned-assessment.component.css']
})
export class AssignedAssessmentComponent implements OnInit,OnDestroy{
  @Output() sendAssessment: EventEmitter<any> = new EventEmitter();
  countDown!: Subscription;
  counter = 20 * 60;
  selectedQuestionId:any;

  allQuestionArray:any=[
    {id:1,questionText:'Text-1',options:[{optId:1,optLabel:'Option1'},
    {optId:2,optLabel:'Option2'},{optId:3,optLabel:'Option3'},{optId:4,optLabel:'Option4'}]},
    {id:2,questionText:'Text-2',options:[{optId:1,optLabel:'Option1'},
    {optId:2,optLabel:'Option2'},{optId:3,optLabel:'Option3'},{optId:4,optLabel:'Option4'}]},
    {id:3,questionText:'Text-3',options:[{optId:1,optLabel:'Option1'},
    {optId:2,optLabel:'Option2'},{optId:3,optLabel:'Option3'},{optId:4,optLabel:'Option4'}]},
    {id:4,questionText:'Text-4',options:[{optId:1,optLabel:'Option1'},
    {optId:2,optLabel:'Option2'},{optId:3,optLabel:'Option3'},{optId:4,optLabel:'Option4'}]},
  ];

  ngOnInit(): void {
    this.countDown = timer(0, 1000).subscribe((res) => {
      --this.counter;
      if (this.counter === 0) {
        this.countDown.unsubscribe();
      }
    });
    this.selectedQuestionId = this.allQuestionArray[0].id
  }

  selectedQues(item:any){
    this.selectedQuestionId = item.id;
  }

  checkQuestionValue(opt:any){
    opt.isChecked = true;
  }

  isCompleted(options:[]){
    return options.some((val:any)=>val.isChecked)
  }

  get isDisabled(){
    return !this.allQuestionArray.every((val:any)=>val.options.some((ele:any)=>ele.isChecked))
  }
  

  save(){
    this.countDown.unsubscribe();
    this.sendAssessment.emit(false)
    console.log(this.allQuestionArray);
  }

  ngOnDestroy(): void {
    this.countDown.unsubscribe();
  }

}
