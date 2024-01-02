import { TestBed } from '@angular/core/testing';

import { QuestionAndQuizService } from './question-and-quiz.service';

describe('QuestionAndQuizService', () => {
  let service: QuestionAndQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAndQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
