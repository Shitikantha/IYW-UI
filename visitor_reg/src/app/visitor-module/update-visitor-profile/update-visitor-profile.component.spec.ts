import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisitorProfileComponent } from './update-visitor-profile.component';

describe('UpdateVisitorProfileComponent', () => {
  let component: UpdateVisitorProfileComponent;
  let fixture: ComponentFixture<UpdateVisitorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVisitorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVisitorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
