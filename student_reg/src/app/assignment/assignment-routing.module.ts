import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { ReportComponent } from './report/report.component';


export const routes: Routes = [
    { path: 'assign-details', component: AssignmentDetailsComponent },
    { path: 'report', component: ReportComponent },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentRoutingModule { }
