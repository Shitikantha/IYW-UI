import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(state.url)
  let role:any = sessionStorage.getItem('userRole')?.toLowerCase();
  console.log(role);
  if(state.url.includes(role) || role =='admin'){
    return true
  }
  return false;
};

