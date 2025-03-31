import { Component, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { RfidService } from '../../services/rfid.service';
import { Participant } from '../../models/participant';
import { ParticipantManagementService } from '../../services/participant-management.service';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { SoftwareConfig } from '../../models/software-config';

@Component({
  selector: 'app-rfid-reader',
  standalone: true,
  imports: [],
  templateUrl: './rfid-reader.component.html',
  styleUrl: './rfid-reader.component.scss'
})
export class RfidReaderComponent implements OnInit, OnDestroy {
  @Output() participant: EventEmitter<Participant> = new EventEmitter();
  private readerActiveSubscription?: Subscription;
  private readerParticipantSubscription?: Subscription;
  reading: boolean = false;
  enabled: boolean = false;

  constructor(public rfidService: RfidService, private participantManagementService: ParticipantManagementService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSoftwareConfig().subscribe((softwareConfig: SoftwareConfig) => this.enabled = softwareConfig.enable_rfid);
    this.readerActiveSubscription = this.rfidService.isActive.subscribe((isActive: boolean) => this.reading = isActive);
    this.readerParticipantSubscription = this.rfidService.uid.subscribe((uid: number[]) => this.handleUidScanned(uid));
  }

  ngOnDestroy() {
    this.readerActiveSubscription?.unsubscribe();
    this.readerParticipantSubscription?.unsubscribe();
    this.stopReading();
  }

  public async startReading(): Promise<void>{
    if(!this.enabled) return;
    try {
      await this.rfidService.readUid();
    }catch (error){
      console.log(error);
      this.stopReading();
    }
  }

  async handleUidScanned(uid: number[]): Promise<void> {
    const participant: Participant | null = await this.identifyParticipant(uid);
    if (participant) this.participant.emit(participant);
  }

  public stopReading(): void{
    this.rfidService.abortReading();
  }

  private async identifyParticipant(uid: number[]): Promise<Participant | null>{
    return (await this.participantManagementService.findByCardId(uid.join(','))) ?? null;
  }

  @HostListener('click', ['$event'])
  private async onClick(event: MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    if(!this.reading) {
      await this.startReading();
    }else {
      this.stopReading();
    }
  }
}
