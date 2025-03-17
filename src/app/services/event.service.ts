import { Injectable } from '@angular/core';
import { ExamEvent } from '../models/exam-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventLog: ExamEvent[] = [];

  constructor() {
    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    this.loadEventLog();
  }

  public log(message: string){
    this.eventLog.unshift(new ExamEvent(new Date(), message));
    this.storeEventLog(this.eventLog);
  }

  public resetLog(): void{
    this.eventLog = [];
    this.storeEventLog(this.eventLog);
  }

  public getLog(): ExamEvent[] {
    return this.eventLog;
  }

  private loadEventLog(): void{
    const val: string | null = localStorage.getItem('eventLog');
    if(val === null) return;
    this.eventLog = JSON.parse(val);
  }

  private storeEventLog(eventLog: ExamEvent[]): void{
    localStorage.setItem('eventLog', JSON.stringify(eventLog));
  }

  private handleStorageEvent(event: StorageEvent): void {
    if(event.key === 'eventLog'){
      this.loadEventLog();
    }
  }
}
