import { Injectable } from '@angular/core';
import { Toilet } from '../models/toilet';
import { ToiletState } from '../models/toilet-state';
import { BehaviorSubject, Subject } from 'rxjs';
import { SettingsService } from './settings.service';
import { DisplayConfig } from '../models/display-config';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class ToiletService {
  t: Toilet[] = [
    {
      state: ToiletState.VACANT
    }
  ];
  toilets: Subject<Toilet[]> = new BehaviorSubject<Toilet[]>(this.t);

  constructor(private settingsService: SettingsService) {
    this.settingsService.getDisplayConfig().subscribe((displayConfig: DisplayConfig) => {
      if(displayConfig.toiletCount !== this.t.length){
        this.setToiletCount(displayConfig.toiletCount);
      }
    });

    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    this.loadToilets();
  }

  public setToiletCount(value: number): void{
    this.t = [];
    for(let i = 0; i < value; i++){
      this.t.push({
        state: ToiletState.VACANT
      });
    }
    this.pushToiletChanges();
  }

  public getToilets(): Subject<Toilet[]>{
    return this.toilets;
  }

  public setToiletState(index: number, state: ToiletState): void{
    if(state !== ToiletState.OCCUPIED) this.t[index].occupant = undefined;
    this.t[index].state = state;
    this.pushToiletChanges();
  }

  private loadToilets(): void{
    const val: string | null = localStorage.getItem('toilets');
    if(val === null) this.t = [{state: ToiletState.VACANT}];
    else this.t = JSON.parse(localStorage.getItem('toilets') as string);
    this.toilets.next(this.t);
  }

  private storeToilets(): void{
    localStorage.setItem('toilets', JSON.stringify(this.t));
  }

  private pushToiletChanges(): void{
    this.toilets.next(this.t);
    this.storeToilets();
  }

  private handleStorageEvent(event: StorageEvent): void{
    if(event.key === 'toilets') this.loadToilets();
  }

  public sendToToilet(participant: Participant): void{
    const toilet: Toilet | undefined = this.t.find(toilet => toilet.state === ToiletState.VACANT);
    if(!toilet) throw new Error('No toilet available.');
    toilet.state = ToiletState.OCCUPIED;
    toilet.occupant = participant;
    this.pushToiletChanges();
  }
}
