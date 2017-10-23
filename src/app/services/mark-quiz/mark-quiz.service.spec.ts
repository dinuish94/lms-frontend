import { TestBed, inject } from '@angular/core/testing';

import { MarkQuizService } from './mark-quiz.service';

describe('MarkQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkQuizService]
    });
  });

  it('should be created', inject([MarkQuizService], (service: MarkQuizService) => {
    expect(service).toBeTruthy();
  }));
});
