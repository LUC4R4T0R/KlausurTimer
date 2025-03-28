import { TestBed } from '@angular/core/testing';

import { ParticipantEventService } from './participant-event.service';

describe('ParticipantEventService', () => {
  let service: ParticipantEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
