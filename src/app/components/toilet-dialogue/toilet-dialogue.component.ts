import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantSelectorComponent } from '../participant-selector/participant-selector.component';
import { Participant } from '../../models/participant';
import { ToiletService } from '../../services/toilet.service';
import { RfidReaderComponent } from '../rfid-reader/rfid-reader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toilet-dialogue',
  standalone: true,
  imports: [
    ModalComponent,
    ParticipantSelectorComponent,
    RfidReaderComponent,
    NgIf,
  ],
  templateUrl: './toilet-dialogue.component.html',
  styleUrl: './toilet-dialogue.component.scss'
})
export class ToiletDialogueComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(RfidReaderComponent) rfidReader?: RfidReaderComponent;
  @ViewChild(ParticipantSelectorComponent) participantSelector?: ParticipantSelectorComponent;

  errorMessage?: string;

  constructor(private toiletService: ToiletService) {
  }

  public start(): void {
    this.modal.open();
    this.rfidReader?.startReading();
  }

  onClose(): void {
    this.rfidReader?.stopReading();
    this.reset();
  }

  onSelected(participant: Participant): void {
    if(this.modal.hideModal) return;
    try {
      this.toiletService.sendToToilet(participant);
      this.modal.close();
    }catch (error) {
      console.warn(error);
      this.errorMessage = (error as Error).message;
    }
  }

  handleParticipantScanned(participant: Participant): void {
    this.onSelected(participant);
  }

  reset(): void{
    this.errorMessage = undefined;
    this.participantSelector?.reset();
  }
}
