import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';


export const routes: Routes = [
    { path: 'assign-details', component: AssignmentDetailsComponent },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentRoutingModule { }
