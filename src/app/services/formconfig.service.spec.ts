import { TestBed } from '@angular/core/testing';

import { FormconfigService } from './formconfig.service';

describe('FormconfigService', () => {
  let service: FormconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
