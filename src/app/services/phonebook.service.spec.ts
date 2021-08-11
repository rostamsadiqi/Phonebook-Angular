import { TestBed } from '@angular/core/testing';

import { PhonebookService } from './phonebook.service';

describe('PhonebookService', () => {
  let service: PhonebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
