import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionModalComponent } from './edit-question-modal.component';

describe('EditQuestionModalComponent', () => {
  let component: EditQuestionModalComponent;
  let fixture: ComponentFixture<EditQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
