import { Injectable } from '@angular/core';
import { ExamConfig } from '../models/exam-config';
import { DisplayConfig } from '../models/display-config';
import { BehaviorSubject, Subject } from 'rxjs';
import * as defaults from '../../defaults';
import { SoftwareConfig } from '../models/software-config';

@Injectable({
  providedIn: 'root'
})
export class SettingsService{
  private examConfigChange: Subject<ExamConfig> = new BehaviorSubject<ExamConfig>(defaults.examConfig);
  private displayConfigChange: Subject<DisplayConfig> = new BehaviorSubject<DisplayConfig>(defaults.displayConfig);
  private softwareConfigChange: Subject<SoftwareConfig> = new BehaviorSubject<SoftwareConfig>(defaults.softwareConfig);

  constructor() {
    const storedExamConfig: ExamConfig | null = this.loadExamConfig();
    if(storedExamConfig !== null){
      this.examConfigChange.next(storedExamConfig);
    }else{
      this.storeExamConfig(defaults.examConfig);
    }

    const storedDisplayConfig: DisplayConfig | null = this.loadDisplayConfig();
    if(storedDisplayConfig !== null){
      this.displayConfigChange.next(storedDisplayConfig);
    }else{
      this.storeDisplayConfig(defaults.displayConfig);
    }

    const storedSoftwareConfig: SoftwareConfig | null = this.loadSoftwareConfig();
    if(storedSoftwareConfig !== null){
      this.softwareConfigChange.next(storedSoftwareConfig);
    }else{
      this.storeSoftwareConfig(defaults.softwareConfig);
    }

    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    addEventListener('load', (event: Event) => {
      if(!sessionStorage.getItem('activeSession')) localStorage.clear(); //clear localStorage when browser has been closed since last use
      sessionStorage.setItem('activeSession', 'true');
    })
  }

  private loadExamConfig(): ExamConfig | null{
    const val: string | null = localStorage.getItem('examConfig');
    if(val === null) return null;
    return JSON.parse(val);
  }

  private storeExamConfig(config: ExamConfig): void{
    localStorage.setItem('examConfig', JSON.stringify(config));
  }

  public setExamConfig(config: ExamConfig): void{
    this.storeExamConfig(config);
    this.examConfigChange.next(config);
  }

  public getExamConfig(): Subject<ExamConfig>{
    return this.examConfigChange;
  }

  private loadDisplayConfig(): DisplayConfig | null{
    const val: string | null = localStorage.getItem('displayConfig');
    if(val === null) return null;
    return JSON.parse(val);
  }

  private storeDisplayConfig(config: DisplayConfig): void{
    localStorage.setItem('displayConfig', JSON.stringify(config));
  }

  public setDisplayConfig(config: DisplayConfig): void{
    this.storeDisplayConfig(config);
    this.displayConfigChange.next(config);
  }

  public getDisplayConfig(): Subject<DisplayConfig>{
    return this.displayConfigChange;
  }

  private loadSoftwareConfig(): SoftwareConfig | null{
    const val: string | null = localStorage.getItem('softwareConfig');
    if(val === null) return null;
    return JSON.parse(val);
  }

  private storeSoftwareConfig(config: SoftwareConfig): void{
    localStorage.setItem('softwareConfig', JSON.stringify(config));
  }

  public setSoftwareConfig(config: SoftwareConfig): void{
    this.storeSoftwareConfig(config);
    this.softwareConfigChange.next(config);
  }

  public getSoftwareConfig(): Subject<SoftwareConfig>{
    return this.softwareConfigChange;
  }

  private handleStorageEvent(event: StorageEvent): void {
    if(event.key === 'examConfig'){
      this.examConfigChange.next(this.loadExamConfig() as ExamConfig);
    }else if(event.key === 'displayConfig'){
      this.displayConfigChange.next(this.loadDisplayConfig() as DisplayConfig);
    }else if(event.key === 'softwareConfig'){
      this.softwareConfigChange.next(this.loadSoftwareConfig() as SoftwareConfig);
    }
  }
}
