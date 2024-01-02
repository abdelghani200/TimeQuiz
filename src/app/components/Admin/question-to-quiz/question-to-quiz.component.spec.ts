import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionToQuizComponent } from './question-to-quiz.component';

describe('QuestionToQuizComponent', () => {
  let component: QuestionToQuizComponent;
  let fixture: ComponentFixture<QuestionToQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionToQuizComponent]
    });
    fixture = TestBed.createComponent(QuestionToQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
