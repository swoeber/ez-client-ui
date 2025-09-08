import { TestBed } from '@angular/core/testing';

import { WorkOrderServiceService } from './work-order-service.service';

describe('WorkOrderServiceService', () => {
  let service: WorkOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
