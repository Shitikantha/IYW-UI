import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { CoursestatusComponent } from './coursestatus/coursestatus.component';

export const routes: Routes = [
    { path: 'addTeacher', component: AddTeacherComponent },
    { path: 'teacherDetails', component: TeacherDetailsComponent },
    { path: 'courseStatus', component: CoursestatusComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherRoutingModule { }
