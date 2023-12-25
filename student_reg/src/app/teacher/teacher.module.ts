import { NgModule } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { AssignClassToTeacherComponent } from './assign-class-to-teacher/assign-class-to-teacher.component';
import { CoursestatusComponent } from './coursestatus/coursestatus.component';

@NgModule({
  declarations: [
    AddTeacherComponent,
    UpdateTeacherComponent,
    ViewTeacherComponent,
    TeacherDetailsComponent,
    AssignClassToTeacherComponent,
    CoursestatusComponent,
  ],
  imports: [
    SharedModuleModule,
    TeacherRoutingModule
  ],
})
export class TeacherModule {}
