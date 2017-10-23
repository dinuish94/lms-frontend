import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPanelComponent } from './quiz-panel.component';

describe('QuizPanelComponent', () => {
  let component: QuizPanelComponent;
  let fixture: ComponentFixture<QuizPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
