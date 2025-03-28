import { Injectable } from '@angular/core';
import { ParticipantEvent } from '../models/participant-event';
import { ParticipantEventType } from '../models/participant-event-type';

const maxTime: number = 8640000000000000;

@Injectable({
  providedIn: 'root'
})
export class ParticipantEventService {
  private eventLog: ParticipantEvent[] = [];

  constructor() {
    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    this.loadEventLog();
  }

  public log(event: ParticipantEvent){
    this.eventLog.unshift(event);
    this.storeEventLog(this.eventLog);
  }

  public resetLog(): void{
    this.eventLog = [];
    this.storeEventLog(this.eventLog);
  }

  public getLog(): ParticipantEvent[] {
    return this.eventLog;
  }

  public getEventsByParticipant(participantId: string): ParticipantEvent[] {
    return this.getLog().filter((event: ParticipantEvent) => event.participantId === participantId).sort((eventA: ParticipantEvent, eventB: ParticipantEvent) => (eventB.timestamp?.getTime() ?? maxTime) - (eventA.timestamp?.getTime() ?? maxTime));
  }

  private loadEventLog(): void{
    const val: string | null = localStorage.getItem('participantEvents');
    if(val === null) return;
    this.eventLog = JSON.parse(val).map((eventPrototype: {participantId: string, timestamp: string | undefined, type: string}) => new ParticipantEvent(eventPrototype.participantId, eventPrototype.type as ParticipantEventType, eventPrototype.timestamp ? new Date(eventPrototype.timestamp) : undefined));
  }

  private storeEventLog(eventLog: ParticipantEvent[]): void{
    localStorage.setItem('participantEvents', JSON.stringify(eventLog));
  }

  private handleStorageEvent(event: StorageEvent): void {
    if(event.key === 'participantEvents'){
      this.loadEventLog();
    }
  }
}
