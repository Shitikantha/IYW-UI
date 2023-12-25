import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursestatusComponent } from './coursestatus.component';

describe('CoursestatusComponent', () => {
  let component: CoursestatusComponent;
  let fixture: ComponentFixture<CoursestatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursestatusComponent]
    });
    fixture = TestBed.createComponent(CoursestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
