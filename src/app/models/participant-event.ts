import { ParticipantEventType } from './participant-event-type';

export class ParticipantEvent{
  constructor(
    public participantId: string,
    public type: ParticipantEventType,
    public timestamp?: Date
  ) {
  }
}
