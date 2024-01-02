import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  // console.log(route,state.url)
  let role:any = sessionStorage.getItem('userRole')?.toLowerCase()
  if(state.url.includes(role)){
    return true
  }
  return false;
};

