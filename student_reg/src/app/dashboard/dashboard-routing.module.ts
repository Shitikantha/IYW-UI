import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbardComponent } from './dashbard/dashbard.component';

export const routes: Routes = [
    { path: '', component: DashbardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
