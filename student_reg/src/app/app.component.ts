import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'visiter-reg';
  user: any;
  isHeaderAvl: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.user = sessionStorage.getItem('userName');
        this.user != null
          ? (this.isHeaderAvl = true)
          : (this.isHeaderAvl = false);
          if(!this.user){
            this.router.navigate(['/']);
          }
      });
  }
}
