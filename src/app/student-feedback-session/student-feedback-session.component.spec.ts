import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeedbackSessionComponent } from './student-feedback-session.component';

describe('StudentFeedbackSessionComponent', () => {
  let component: StudentFeedbackSessionComponent;
  let fixture: ComponentFixture<StudentFeedbackSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFeedbackSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeedbackSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
