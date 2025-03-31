import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantSelectorComponent } from '../participant-selector/participant-selector.component';
import { Participant } from '../../models/participant';
import { ParticipantEventService } from '../../services/participant-event.service';
import { ParticipantEvent } from '../../models/participant-event';
import { ParticipantEventType } from '../../models/participant-event-type';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { FormsModule } from '@angular/forms';
import { RfidReaderComponent } from '../rfid-reader/rfid-reader.component';

@Component({
  selector: 'app-submission-dialogue',
  standalone: true,
  imports: [
    ModalComponent,
    ParticipantSelectorComponent,
    FormsModule,
    RfidReaderComponent,
  ],
  templateUrl: './submission-dialogue.component.html',
  styleUrl: './submission-dialogue.component.scss'
})
export class SubmissionDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(RfidReaderComponent) rfidReader!: RfidReaderComponent;
  @ViewChild(ParticipantSelectorComponent) participantSelector?: ParticipantSelectorComponent;

  reason: ParticipantEventType = ParticipantEventType.EXAM_SUBMISSION;

  constructor(private participantEventService: ParticipantEventService, private timerService: TimerService) {
  }

  public start(): void {
    this.modal.open();
    this.rfidReader.startReading();
  }

  onClose(): void {
    this.rfidReader?.stopReading();
    this.reset();
  }

  onSelected(participant: Participant): void {
    if(this.modal.hideModal) return;
    this.participantEventService.log(
      new ParticipantEvent(participant.id as string,
        this.reason,
        this.timerService.getState() === ExamState.FINISHED ? undefined : new Date()
      ));
    this.modal.close();
  }

  handleParticipantScanned(participant: Participant): void {
    this.onSelected(participant);
  }

  reset(): void{
    this.reason = ParticipantEventType.EXAM_SUBMISSION;
    this.participantSelector?.reset();
  }

  protected readonly ParticipantEventType = ParticipantEventType;
}
