import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { v4 as uuid } from 'uuid';
import { ParticipationState } from '../models/participation-state';
import { ExamConfig } from '../models/exam-config';
import * as defaults from '../../defaults';

@Injectable({
  providedIn: 'root'
})
export class ParticipantManagementService {
  private participants: Participant[] = [
    {
      id: 'c1f7417b-f64e-44d7-a21a-6ddb3054d26c',
      cardId: '4,133,77,42,114,101,128',
      firstName: 'Luca',
      lastName: 'Ringhausen',
      state: ParticipationState.REGISTERED
    }
  ];

  constructor() {
    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    if(localStorage.getItem('participants')){
      this.loadParticipants();
    }else{
      this.storeParticipants();
    }
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

  async findByCardId(cardId: string): Promise<Participant | undefined>{
    return this.participants.find((participant: Participant) => participant.cardId === cardId);
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

  public storeParticipants(): void {
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
