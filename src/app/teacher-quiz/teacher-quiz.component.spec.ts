import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizComponent } from './teacher-quiz.component';

describe('TeacherQuizComponent', () => {
  let component: TeacherQuizComponent;
  let fixture: ComponentFixture<TeacherQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
