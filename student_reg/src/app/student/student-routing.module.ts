import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

export const routes: Routes = [
    { path: 'addStudent', component: AddStudentComponent },
    { path: 'studentDetails', component: StudentDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }
