import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { AssignmentMeta } from './assignmentMeta';
import { AlertService } from 'src/app/services/alert.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css'],
})
export class AssignmentDetailsComponent implements OnInit {
  @Input() isView:any;
  assignmentHeader: any;
  assignmentData: any = [];
  isFullScreen: boolean = false;
  docElement!: HTMLElement;
  assignmentSetting: any;
  viewAssignmentSetting: any;
  viewData:any;
  status: string = 'Pending';
  selectedAssignment: any;
  levelStatus: any = {
    Easy: false,
    Moderate: false,
    Challenging: false,
    Hard: false,
  };

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private alertService: AlertService,
    private assignService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.assignmentHeader = AssignmentMeta;
    this.docElement = document.documentElement;
    this.getAssignment();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  closeModal(event: any) {
    this.assignmentSetting = {
      ...this.assignmentSetting,
      isOpen: false,
    };
   
    document.exitFullscreen();
    this.isFullScreen = false;
    if(event){
      this.getAssignment();
    }
  }

  closeViewAssignment(event:any){
    this.viewAssignmentSetting = {
      ...this.viewAssignmentSetting,
      isOpen: false,
    };
  }

  openAssessment(item: any) {
    this.assignmentSetting = {
      ...this.assignmentSetting,
      isOpen: true,
      size: 'xl',
      title: 'Assessment',
      isFooter:true
    };
    this.selectedAssignment = item;
    this.toggleFullScreen();
    // console.log(item)
  }

  viewAssessment(item:any){
    // console.log(item);
    this.viewAssignmentSetting = {
      ...this.viewAssignmentSetting,
      isOpen: true,
      size: 'xl',
      title: 'View Assessment',
      isFooter:true
    }
    this.viewData = item;
  }

  getAssignment() {
    let payload = {
      orgId: sessionStorage.getItem('orgId'),
      status: this.status,
      studentId: this.isView?.userId || sessionStorage.getItem('userId'),
    };
    this.levelStatus = {
      Easy: false,
      Moderate: false,
      Challenging: false,
      Hard: false,
    };
    if(this.isView){
      let hideName = ['Completed Date','Score (%)','Action','Time Taken']
      if(this.status == 'Pending'){
        this.assignmentHeader = AssignmentMeta.map((val:any)=>{
          if(hideName.includes(val.name)){
            val.visible=false;
          }
          return val;
        });
      }else{
        this.assignmentHeader = AssignmentMeta.map((val:any)=>{
          val.visible=true;
          return val;
        });
      }
      
    }
    this.assignService.getAssignmentsDetails(payload).subscribe({
      next: (res: any) => {
        const result = res.data.map((val: any) => {
          let conditionKey = Object.keys(this.levelStatus);
          if(!conditionKey.includes(val.level)){
            this.levelStatus = {...this.levelStatus,[val.level]:true};
          }
          this.isLevelCondition(val);
            return {
              ...val,
              assignedDate: val.assignedDate
                ? new DatePipe('en-US').transform(
                    val.assignedDate,
                    'd MMM y,h:mm a'
                  )
                : null,
              completedDate: val.assignedDate
                ? new DatePipe('en-US').transform(
                    val.completedDate,
                    'd MMM y,h:mm a'
                  )
                : null,
                duration:val.duration ? this.convertStoMs(val.duration):null,
              disabledIcon: {
                'Start-test': val.status == 'Pending' && this.levelStatus[val.level] && !this.isView,
                view: val.status == 'Completed',
              },
            };
        });
        this.assignmentData = [...result];
        console.log(this.assignmentData);
      },
    });
  }

  isLevelCondition(item:any){
    switch (item.level) {
        case 'Easy':
          if(item.status === 'Pending'){
            this.levelStatus = {...this.levelStatus,'Easy':true};
          }
        break;
        case 'Moderate':
          if(!this.levelStatus.Easy && item.status === 'Pending'){
            this.levelStatus = {...this.levelStatus,'Moderate':true};
          }
        break;
        case 'Challenging':
          if(!this.levelStatus.Easy && !this.levelStatus.Moderate && item.status === 'Pending'){
            this.levelStatus = {...this.levelStatus,'Challenging':true};
          }
        break;
        case 'Hard':
          if(!this.levelStatus.Easy && !this.levelStatus.Moderate
             && !this.levelStatus.Challenging && item.status === 'Pending'){
            this.levelStatus = {...this.levelStatus,'Hard':true};
          }
        break;
    }
  }

  getAction(action: any) {
    console.log(action);
    switch (action.type) {
      case 'view':
        this.viewAssessment(action.data)
        break;
      case 'Start-test':
        this.openAssessment(action.data);
        break;
      default:
        console.log('default');
    }
  }

  @HostListener('document:fullscreenchange', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (!document.fullscreenElement) {
      document.exitFullscreen;
      this.isFullScreen = false;
      // console.log(this.isFullScreen);
    }
  }

  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.docElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
    // console.log(this.isFullScreen);
  }

  getAssessment(event: any) {
    this.assignmentSetting = {
      ...this.assignmentSetting,
      isOpen: false,
    };
    document.exitFullscreen();
    this.isFullScreen = false;
      if (event) {
        this.getAssignment();
      }
  }

  statusChange(btnValue: string) {
    this.status = btnValue;
    this.getAssignment();
  }

  convertStoMs(seconds:any) {
    let minutes:any = Math.floor(seconds / 60);
    let extraSeconds:any = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds< 10 ? "0" + extraSeconds : extraSeconds;
    return `${minutes}  : ${extraSeconds} `
 }
}
