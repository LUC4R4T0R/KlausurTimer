import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantSelectorComponent } from '../participant-selector/participant-selector.component';
import { Participant } from '../../models/participant';

@Component({
  selector: 'app-toilet-dialogue',
  standalone: true,
  imports: [
    ModalComponent,
    ParticipantSelectorComponent,
  ],
  templateUrl: './toilet-dialogue.component.html',
  styleUrl: './toilet-dialogue.component.scss'
})
export class ToiletDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  public start(): void {
    this.modal.open();
  }

  onClose(): void {

  }

  onSelected(participant: Participant): void {
  }
}
