import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantSelectorComponent } from '../participant-selector/participant-selector.component';
import { Participant } from '../../models/participant';
import { ParticipantEventService } from '../../services/participant-event.service';
import { ParticipantEvent } from '../../models/participant-event';
import { ParticipantEventType } from '../../models/participant-event-type';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';

@Component({
  selector: 'app-submission-dialogue',
  standalone: true,
    imports: [
        ModalComponent,
        ParticipantSelectorComponent,
    ],
  templateUrl: './submission-dialogue.component.html',
  styleUrl: './submission-dialogue.component.scss'
})
export class SubmissionDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private participantEventService: ParticipantEventService, private timerService: TimerService) {
  }

  public start(): void {
    this.modal.open();
  }

  onClose(): void {

  }

  onSelected(participant: Participant): void {
    this.participantEventService.log(
      new ParticipantEvent(participant.id as string,
        ParticipantEventType.EXAM_SUBMISSION,
        this.timerService.getState() === ExamState.FINISHED ? undefined : new Date()
      ));
    this.modal.close();
  }
}
