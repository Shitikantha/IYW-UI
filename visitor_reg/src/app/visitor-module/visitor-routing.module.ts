import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorDashboardComponent } from './visitor-dashboard/visitor-dashboard.component';

export const routes: Routes = [
    { path: '', component: VisitorDashboardComponent },
    { path: 'add', component: AddVisitorComponent },
    { path: 'visitor-list', component: VisitorListComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }) 
export class VisitorRoutingModule { }
