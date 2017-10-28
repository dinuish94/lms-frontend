import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentComponent } from './admin-student.component';

describe('AdminStudentComponent', () => {
  let component: AdminStudentComponent;
  let fixture: ComponentFixture<AdminStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
