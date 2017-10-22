import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentsComponent } from './teacher-assignments.component';

describe('TeacherAssignmentsComponent', () => {
  let component: TeacherAssignmentsComponent;
  let fixture: ComponentFixture<TeacherAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
