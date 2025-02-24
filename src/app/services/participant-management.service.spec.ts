import { TestBed } from '@angular/core/testing';

import { ParticipantManagementService } from './participant-management.service';

describe('ParticipantManagementService', () => {
  let service: ParticipantManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
