import { ExamConfig } from './app/models/exam-config';
import { DisplayConfig } from './app/models/display-config';

export const examConfig: ExamConfig = {
  title: '',
  subTitle: '',
  room: '',
  resources: $localize`keine`,
  duration: 7200000, // 2h in milliseconds
  extended_logging: false
};

export const displayConfig: DisplayConfig = {
  displayClock: true,
  displayDate: true,
  displayDuration: false,
  displayEventLog: false,
  toiletCount: 1
};
