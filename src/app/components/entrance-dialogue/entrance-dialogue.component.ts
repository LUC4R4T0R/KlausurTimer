import { Component, ViewChild } from '@angular/core';
import { ParticipantEditorComponent } from '../participant-editor/participant-editor.component';
import { ModalComponent } from '../modal/modal.component';
import { Participant } from '../../models/participant';
import { ParticipantInfoComponent } from '../participant-info/participant-info.component';
import { ParticipationState } from '../../models/participation-state';
import { RfidService } from '../../services/rfid.service';
import { RfidReaderComponent } from '../rfid-reader/rfid-reader.component';
import { ParticipantManagementService } from '../../services/participant-management.service';
import { ParticipantEventService } from '../../services/participant-event.service';
import { ParticipantEvent } from '../../models/participant-event';
import { ParticipantEventType } from '../../models/participant-event-type';

@Component({
  selector: 'app-entrance-dialogue',
  standalone: true,
  imports: [
    ParticipantEditorComponent,
    ModalComponent,
    ParticipantInfoComponent,
    RfidReaderComponent,
  ],
  templateUrl: './entrance-dialogue.component.html',
  styleUrl: './entrance-dialogue.component.scss'
})
export class EntranceDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(RfidReaderComponent) rfidReader!: RfidReaderComponent;
  savedParticipant?: Participant;

  constructor(private participantEventService: ParticipantEventService, private participantManagementService: ParticipantManagementService) {
  }

  public start(): void {
    this.modal.open();
    this.rfidReader.startReading();
  }

  onClose(): void {
    this.rfidReader.stopReading();
    this.reset();
  }

  onAbort(): void {
    this.modal.close();
  }

  onSaved(participant: Participant): void {
    this.participantEventService.log(new ParticipantEvent(participant.id as string, ParticipantEventType.EXAM_ENTRY, new Date()));
    this.savedParticipant = participant;
  }

  reset(): void {
    this.savedParticipant = undefined;
  }

  nextParticipant(): void {
    this.reset();
    this.rfidReader.startReading();
  }

  handleParticipantCardScanned(participant: Participant): void{
    if(this.modal.hideModal) return;
    participant.state = ParticipationState.PRESENT;
    this.participantManagementService.storeParticipants();
    this.onSaved(participant);
  }
}
