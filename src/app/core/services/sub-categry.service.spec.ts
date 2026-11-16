import { TestBed } from '@angular/core/testing';
import { SubCategryService } from './sub-categry.service';

describe('SubCategryService', () => {
  let service: SubCategryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
