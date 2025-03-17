import { ParticipationState } from './participation-state';

export interface Participant{
  id?: string;
  cardId?: string;
  firstName: string;
  lastName: string;
  seatNumber?: string;
  state: ParticipationState;
  submissionTime?: Date;
  comment?: string;
}
