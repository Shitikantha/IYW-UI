import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean | UrlTree {
      if (!this.userIn) return true;
      return this.router.parseUrl('dashboard');
  }

  get userIn(){
    let user = sessionStorage.getItem('userName');
      return user;
  }
  
}
