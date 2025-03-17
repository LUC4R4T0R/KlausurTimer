import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantSelectorComponent } from '../participant-selector/participant-selector.component';
import { Participant } from '../../models/participant';
import { ToiletService } from '../../services/toilet.service';

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

  constructor(private toiletService: ToiletService) {
  }

  public start(): void {
    this.modal.open();
  }

  onClose(): void {

  }

  onSelected(participant: Participant): void {
    try {
      this.toiletService.sendToToilet(participant);
      this.modal.close();
    }catch (error) {
      console.warn(error);
    }
  }
}
