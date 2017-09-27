import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrolledCoursesComponent } from './student-enrolled-courses.component';

describe('StudentEnrolledCoursesComponent', () => {
  let component: StudentEnrolledCoursesComponent;
  let fixture: ComponentFixture<StudentEnrolledCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEnrolledCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrolledCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
