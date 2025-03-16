import { ToiletState } from './toilet-state';
import { Participant } from './participant';

export interface Toilet{
  state:ToiletState,
  occupant?: Participant
}
