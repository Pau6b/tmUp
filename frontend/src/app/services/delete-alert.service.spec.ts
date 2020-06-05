import { TestBed } from '@angular/core/testing';

import { DeleteAlertService } from './delete-alert.service';

describe('DeleteAlertService', () => {
  let service: DeleteAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
