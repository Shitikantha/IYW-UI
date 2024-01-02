import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { roleGuard } from './services/auth/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule),
    canActivate: [AuthGuard ],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    // canActivate:[roleGuard]
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
    // canActivate:[roleGuard]
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
    // canActivate:[roleGuard]
  },
  {
    path: 'assignment',
    loadChildren: () => import('./assignment/assignment.module').then(m => m.AssignmentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
