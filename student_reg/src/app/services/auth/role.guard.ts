import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  let url = state.url.split('/')[1];
  let student = ['teacher','question','student'];
  let teacher = ['question','student'];
  let role:any = sessionStorage.getItem('userRole')?.toLowerCase();
  if(role == 'student' || role == 'guardian'){
    return !student.includes(url);
  }
  if(role == 'teacher'){
    return teacher.includes(url);
  }
  return true;
};

