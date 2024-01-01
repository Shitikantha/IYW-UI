import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModuleModule } from './user-module/user-module.module';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { QuestionModule } from './question/question.module';
import { AssignmentModule } from './assignment/assignment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModuleModule,
    SharedModuleModule,
    StudentModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    BrowserAnimationsModule,
    TeacherModule,
    QuestionModule,
    AssignmentModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
