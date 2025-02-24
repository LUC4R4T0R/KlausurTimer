import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Participant } from '../../models/participant';
import { ParticipationState } from '../../models/participation-state';
import { ParticipantManagementService } from '../../services/participant-management.service';

@Component({
  selector: 'app-participant-editor',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './participant-editor.component.html',
  styleUrl: './participant-editor.component.scss'
})
export class ParticipantEditorComponent implements OnInit {
  @Input() participant?: Participant;
  @Output() saved: EventEmitter<Participant> = new EventEmitter<Participant>();
  @Output() abort: EventEmitter<void> = new EventEmitter<void>();
  tempParticipant!: Participant;
  newParticipant: boolean = false;

  constructor(private participantManagementService: ParticipantManagementService) {
  }

  ngOnInit() {
    if(this.participant) {
      this.newParticipant = false;
      this.tempParticipant = this.participant;
    }else {
      this.reset();
    }
  }

  public reset(): void {
    this.newParticipant = true;
    this.tempParticipant = {firstName: '', lastName: '', state: ParticipationState.PRESENT};
  }

  onAbort(): void {
    this.reset();
    this.abort.emit();
  }

  saveChanges(): void {
    if(this.newParticipant) {
      this.saved.emit(this.participantManagementService.registerParticipant(this.tempParticipant));
      this.reset();
    }
  }

  protected readonly ParticipationState = ParticipationState;
}
