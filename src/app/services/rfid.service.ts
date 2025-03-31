import { Injectable } from '@angular/core';
import { ScriptService } from './script.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class RfidService {
  private reader: any;

  private Pn532: any;
  private Packet: any;
  private utils: any;
  private Hf14a: any;
  private WebserialAdapter: any;
  private abort: boolean = false;

  public isActive: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private busy: boolean = false;

  public uid: Subject<number[]> = new Subject<number[]>();

  constructor(private scriptService: ScriptService) {
    this.scriptService.load('lodash', 'PN532_core', 'PN532_Hf14a', 'PN532_WebSerial').then(() => {
      const {
        _, // lodash: https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js
        Pn532: { Pn532, Packet, utils: Pn532utils },
        Pn532Hf14a,
        Pn532WebserialAdapter,
      } = window;
      this.Pn532 = Pn532;
      this.Packet = Packet;
      this.utils = Pn532.utils;
      this.Hf14a = Pn532Hf14a;
      this.WebserialAdapter = Pn532WebserialAdapter;
    });
  }

  initReader(): void {
    this.reader = new this.Pn532();
    this.reader.use(new this.WebserialAdapter()); // A pn532 instance must register exactly one adapter plugin
    this.reader.use(new this.Hf14a());
  }

  async testReaderConnection(): Promise<boolean> {
    return this.reader.testCommunication();
  }

  async ensureReaderAvailable(): Promise<void> {
    if(!this.reader) this.initReader();
    await this.testReaderConnection()
      .catch(error => {
      });
  }

  abortReading(): void {
    this.abort = true;
  }

  setActive(): void {
    this.busy = true;
    this.isActive.next(true);
    console.log('reading');
  }

  setInActive(): void {
    this.isActive.next(false);
    this.busy = false;
    console.log('stopped reading');
  }

  async readUid(): Promise<void> {
    if(this.busy) return;
    await this.ensureReaderAvailable();
    this.abort = false;
    while(!this.abort){
      try {
        this.setActive();
        await this.singleScanInstance();
        this.setInActive();
        return ;
      }catch(error) {
        console.log(error);
      }
    }
    this.setInActive();
    return Promise.reject();
  }

  async singleScanInstance(): Promise<void> {
    await this.reader.$hf14a.mfSelectCard({timeout: 2000})
      .then((data: {uid: number[]}) => {
        this.uid.next(data.uid);
        console.log(data.uid.join(','));
      })
  }

}
