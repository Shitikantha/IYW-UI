import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { AssignmentMeta } from './assignmentMeta';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css'],
})
export class AssignmentDetailsComponent implements OnInit {
  assignmentHeader: any;
  assignmentData: any = [
    {
      subject: 'Math',
      chapter: 'Increment',
      level: 'Easy',
      status: 'Completed',
      score: '97%',
      time: '12 min',
    },
    {
      subject: 'Math',
      chapter: 'Increment',
      level: 'Hard',
      status: 'Pending',
      score: null,
      time: null,
    },
    {
      subject: 'Math',
      chapter: 'Increment',
      level: 'Hard',
      status: 'Pending',
      score: null,
      time: null,
    },
  ];
  isFullScreen: boolean = false;
  docElement!: HTMLElement;
  assignmentSetting:any

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private alertService:AlertService,
  ) {}

  ngOnInit(): void {
    this.assignmentHeader = AssignmentMeta;
    const result = this.assignmentData.map((val: any) => {
      return {
        ...val,
        disabledIcon: {
          'Start-test': val.status == 'Pending',
          view: val.status == 'Completed',
        },
      };
    });
    this.assignmentData = [...result];
    this.docElement = document.documentElement;
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
  }

  openAssessment(){
    this.assignmentSetting = {
      ...this.assignmentSetting,
      isOpen: true,
      size: 'xl',
      title: 'Assessment',
    };
    this.toggleFullScreen();
    // this.alertService.showConfirmMsg();
  }

  getAction(action: any) {
    console.log(action);
    switch (action.type) {
      case 'view':
        break;
      case 'Start-test':
        this.openAssessment();
        break;
      default:
        console.log('default');
    }
  }

  @HostListener('document:fullscreenchange', ['$event']) onKeydownHandler(event: KeyboardEvent) {
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

  getAssessment(event:any){
    this.assignmentSetting = {
      ...this.assignmentSetting,
      isOpen: false,
    };
    document.exitFullscreen();
    this.isFullScreen = false;
  }
}
