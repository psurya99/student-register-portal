import { TestBed } from '@angular/core/testing';

import { CountyListService } from './county-list.service';

describe('CountyListService', () => {
  let service: CountyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
