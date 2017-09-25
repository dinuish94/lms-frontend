import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsComponent } from './quiz-questions.component';

describe('QuizQuestionsComponent', () => {
  let component: QuizQuestionsComponent;
  let fixture: ComponentFixture<QuizQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
