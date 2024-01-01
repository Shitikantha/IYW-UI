import { NgModule } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { AssignedAssessmentComponent } from './assigned-assessment/assigned-assessment.component';
import { TimerFormatePipe } from './assigned-assessment/timer-formate.pipe';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';


@NgModule({
  declarations: [
    AssignmentDetailsComponent,
    AssignedAssessmentComponent,
    TimerFormatePipe,
    ViewAssignmentComponent
  ],
  imports: [
    SharedModuleModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
