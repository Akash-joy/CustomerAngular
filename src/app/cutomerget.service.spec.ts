import { TestBed } from '@angular/core/testing';

import { CutomergetService } from './cutomerget.service';

describe('CutomergetService', () => {
  let service: CutomergetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutomergetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
