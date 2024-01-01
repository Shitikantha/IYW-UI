import { Component, Input, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit{
  @Input() viewData:any;
  allAssignedQuestions:any = []

  constructor(private assignService: AssignmentService){}
  ngOnInit(): void {
    console.log(this.viewData);
    this.getViewAssignment();
  }

  getViewAssignment(){
    this.assignService.viewAssignments(this.viewData.assignmeId).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.allAssignedQuestions = res.data;
      },
    });
  }

  getGivenOptionsName(item:[],givenOption:number){
    let data:any = item.find((val:any)=>val.questionOptionId === givenOption);
    return data.optionText;
  }

  getCorrectAnswerName(item:[]){
    let data:any = item.find((val:any)=>val.isCorrect);
    return data.optionText;
  }

  isCorrectAnswer(item:[],givenOption:number){
    let correctAnswer:any = item.find((val:any)=>val.isCorrect);
    let givenAnswer:any = item.find((val:any)=>val.questionOptionId === givenOption);
    return correctAnswer.questionOptionId === givenAnswer.questionOptionId;
  }

}
