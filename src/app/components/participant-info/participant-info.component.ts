import { Component, Input } from '@angular/core';
import { Participant } from '../../models/participant';
import { NgIf } from '@angular/common';
import { ParticipationStateNames } from '../../models/participation-state';

@Component({
  selector: 'app-participant-info',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './participant-info.component.html',
  styleUrl: './participant-info.component.scss'
})
export class ParticipantInfoComponent {
  @Input() participant!: Participant;

  getState(): string {
    return ParticipationStateNames[this.participant.state];
  }
}
