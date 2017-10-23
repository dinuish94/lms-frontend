import { TestBed, inject } from '@angular/core/testing';

import { TeacherAssignmentsService } from './teacher-assignments.service';

describe('TeacherAssignmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherAssignmentsService]
    });
  });

  it('should be created', inject([TeacherAssignmentsService], (service: TeacherAssignmentsService) => {
    expect(service).toBeTruthy();
  }));
});
