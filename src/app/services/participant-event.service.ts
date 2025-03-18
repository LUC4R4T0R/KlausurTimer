import { Injectable } from '@angular/core';
import { ParticipantEvent } from '../models/participant-event';

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
    return this.getLog().filter((event: ParticipantEvent) => event.participantId === participantId);
  }

  private loadEventLog(): void{
    const val: string | null = localStorage.getItem('participantEvents');
    if(val === null) return;
    this.eventLog = JSON.parse(val);
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
