import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidQuestionComponent } from './valid-question.component';

describe('ValidQuestionComponent', () => {
  let component: ValidQuestionComponent;
  let fixture: ComponentFixture<ValidQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidQuestionComponent]
    });
    fixture = TestBed.createComponent(ValidQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
