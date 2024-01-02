import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommunComponent } from './form-commun.component';

describe('FormCommunComponent', () => {
  let component: FormCommunComponent;
  let fixture: ComponentFixture<FormCommunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCommunComponent]
    });
    fixture = TestBed.createComponent(FormCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
