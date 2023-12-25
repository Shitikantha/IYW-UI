import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClassToTeacherComponent } from './assign-class-to-teacher.component';

describe('AssignClassToTeacherComponent', () => {
  let component: AssignClassToTeacherComponent;
  let fixture: ComponentFixture<AssignClassToTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignClassToTeacherComponent]
    });
    fixture = TestBed.createComponent(AssignClassToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
