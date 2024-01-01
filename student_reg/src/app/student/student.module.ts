import { NgModule } from '@angular/core';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AddStudentComponent,
    StudentDetailsComponent,
    UpdateStudentComponent,
    ViewStudentComponent
  ],
  imports: [
    SharedModuleModule,
    StudentRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class StudentModule { }
