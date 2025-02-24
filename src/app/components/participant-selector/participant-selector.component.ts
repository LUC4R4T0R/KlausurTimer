import { Component, OnInit } from '@angular/core';
import { Participant } from '../../models/participant';
import { ParticipantManagementService } from '../../services/participant-management.service';
import { filter } from 'rxjs';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-participant-selector',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './participant-selector.component.html',
  styleUrl: './participant-selector.component.scss'
})
export class ParticipantSelectorComponent implements OnInit {
  participants: Participant[] = [];
  searchTerm: string = '';

  constructor(private participantManagementService: ParticipantManagementService) {
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participants = this.participantManagementService.getParticipants();
  }

  get filteredParticipants(): Participant[] {
    return this.participants
      .sort((participantA: Participant, participantB: Participant) => this.sort(participantA, participantB))
      .filter((participant: Participant) => this.filter(participant));
  }

  filter(participant: Participant): boolean {
    return participant.seatNumber?.trim().toLowerCase().toString().includes(this.searchTerm.trim().toLowerCase())
      || this.getFullName(participant).trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase());
  }

  sort(participantA: Participant, participantB: Participant): number {
    return (participantA.seatNumber && participantB.seatNumber && participantA.seatNumber !== participantB.seatNumber) ? (participantA.seatNumber as string).localeCompare(participantB.seatNumber as string) : this.getFullName(participantA).localeCompare(this.getFullName(participantB));
  }

  private getFullName(participant: Participant): string {
    return participant.lastName + ', ' + participant.firstName;
  }
}
