import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ParticipantManagementService {
  private participants: Participant[] = [];

  constructor() {
    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    this.loadParticipants();
  }

  public getParticipants(): Participant[] {
    return this.participants;
  }

  public getParticipantsSorted(): Participant[] {
    return this.participants.sort(ParticipantManagementService.sortParticipants);
  }

  public getParticipant(id: string): Participant | undefined {
    return this.participants.find((participant: Participant) => participant.id === id);
  }

  public registerParticipant(participant: Participant): Participant {
    participant.id = uuid();
    this.participants.push(participant);
    this.storeParticipants();
    return participant;
  }

  private loadParticipants(): void {
    const val: string | null = localStorage.getItem('participants');
    if(val === null) this.participants = [];
    else this.participants = JSON.parse(val as string);
  }

  private storeParticipants(): void {
    localStorage.setItem('participants', JSON.stringify(this.participants));
  }

  private handleStorageEvent(event: StorageEvent): void{
    if(event.key === 'participants') this.loadParticipants();
  }

  public static sortParticipants(participantA: Participant, participantB: Participant): number {
    return participantA.lastName.localeCompare(participantB.lastName, 'de')
      || participantA.firstName.localeCompare(participantB.firstName, 'de');
  }
}
