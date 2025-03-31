import { ExamConfig } from './app/models/exam-config';
import { DisplayConfig } from './app/models/display-config';
import { SoftwareConfig } from './app/models/software-config';
import { Participant } from './app/models/participant';
import { ParticipationState } from './app/models/participation-state';

export const examConfig: ExamConfig = {
  title: '',
  subTitle: '',
  room: '',
  resources: $localize`keine`,
  duration: 7200000, // 2h in milliseconds
  primaryExaminer: '',
  secondaryExaminer: '',
  attendants: ['']
};

export const displayConfig: DisplayConfig = {
  displayClock: true,
  displayDate: true,
  displayDuration: false,
  displayEventLog: false,
  toiletCount: 1
};

export const softwareConfig: SoftwareConfig = {
  extended_logging: false,
  enable_rfid: false
}

export const exampleParticipants: Participant[] = [
  {
    id: 'c1f7417b-f64e-44d7-a21a-6ddb3054d26c',
    cardId: '4,133,77,42,114,101,128',
    firstName: 'Luca',
    lastName: 'Ringhausen',
    state: ParticipationState.REGISTERED
  },
  {
    id: '570bb49b-4887-4fcd-a0f6-9674681f8c0e',
    cardId: '4,189,47,27,25,97,128',
    firstName: 'Ada',
    lastName: 'Lovelace',
    state: ParticipationState.REGISTERED
  },
  {
    id: 'fa68ba48-75cf-4c71-a946-92c5e28d2f1c',
    cardId: '4,115,117,30,73,97,128',
    firstName: 'Charles',
    lastName: 'Babbage',
    state: ParticipationState.REGISTERED
  },
  {
    id: 'bff95d0c-31bc-41c4-af41-c030bf22f0a7',
    cardId: '4,110,218,27,25,97,129',
    firstName: 'Alan',
    lastName: 'Turing',
    state: ParticipationState.REGISTERED
  },
  {
    id: 'e369c515-2248-484f-8600-e79e420b9ea6',
    cardId: '4,165,42,27,25,97,129',
    firstName: 'Konrad',
    lastName: 'Zuse',
    state: ParticipationState.REGISTERED
  },
  {
    id: 'a825f296-c709-43dd-9612-bcbc0e8e54f9',
    cardId: '4,231,76,35,25,97,128',
    firstName: 'Grace',
    lastName: 'Hopper',
    state: ParticipationState.REGISTERED
  },
  {
    id: 'bfdd2fc1-81d2-4b38-8812-7f0588c1d411',
    cardId: '4,14,161,30,73,97,128',
    firstName: 'Tim',
    lastName: 'Berners-Lee',
    state: ParticipationState.REGISTERED
  }
];
