import { TestBed, inject } from '@angular/core/testing';

import { TeacherQuizService } from './teacher-quiz.service';

describe('TeacherQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherQuizService]
    });
  });

  it('should be created', inject([TeacherQuizService], (service: TeacherQuizService) => {
    expect(service).toBeTruthy();
  }));
});
