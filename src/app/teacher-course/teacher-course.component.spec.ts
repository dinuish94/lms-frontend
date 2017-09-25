import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseComponent } from './teacher-course.component';

describe('TeacherCourseComponent', () => {
  let component: TeacherCourseComponent;
  let fixture: ComponentFixture<TeacherCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
