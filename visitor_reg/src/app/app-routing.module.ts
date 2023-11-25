import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule),
    canActivate: [AuthGuard ],
  },
  {
    path: 'visitor',
    loadChildren: () => import('./visitor-module/visitor-routing.module').then(m => m.VisitorRoutingModule),
    // canActivate: [AuthGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
