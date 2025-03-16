import { ExamConfig } from './app/models/exam-config';
import { DisplayConfig } from './app/models/display-config';
import { SoftwareConfig } from './app/models/software-config';

export const examConfig: ExamConfig = {
  title: '',
  subTitle: '',
  room: '',
  resources: $localize`keine`,
  duration: 7200000 // 2h in milliseconds
};

export const displayConfig: DisplayConfig = {
  displayClock: true,
  displayDate: true,
  displayDuration: false,
  displayEventLog: false,
  toiletCount: 1
};

export const softwareConfig: SoftwareConfig = {
  extended_logging: false
}
