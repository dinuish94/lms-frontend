import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseHomeComponent } from './student-course-home.component';

describe('StudentCourseHomeComponent', () => {
  let component: StudentCourseHomeComponent;
  let fixture: ComponentFixture<StudentCourseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
