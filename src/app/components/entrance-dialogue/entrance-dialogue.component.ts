import { Component, ViewChild } from '@angular/core';
import { ParticipantEditorComponent } from '../participant-editor/participant-editor.component';
import { ModalComponent } from '../modal/modal.component';
import { Participant } from '../../models/participant';
import { ParticipantInfoComponent } from '../participant-info/participant-info.component';
import { ParticipationState } from '../../models/participation-state';

@Component({
  selector: 'app-entrance-dialogue',
  standalone: true,
  imports: [
    ParticipantEditorComponent,
    ModalComponent,
    ParticipantInfoComponent,
  ],
  templateUrl: './entrance-dialogue.component.html',
  styleUrl: './entrance-dialogue.component.scss'
})
export class EntranceDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  savedParticipant?: Participant;

  public start(): void {
    this.modal.open();
  }

  onClose(): void {
    this.reset();
  }

  onAbort(): void {
    this.modal.close();
  }

  onSaved(participant: Participant): void {
    this.savedParticipant = participant;
  }

  reset(): void {
    this.savedParticipant = undefined;
  }

  nextParticipant(): void {
    this.reset();
  }
}
