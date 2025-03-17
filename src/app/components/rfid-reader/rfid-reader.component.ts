import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { RfidService } from '../../services/rfid.service';
import { Participant } from '../../models/participant';
import { ParticipantManagementService } from '../../services/participant-management.service';

@Component({
  selector: 'app-rfid-reader',
  standalone: true,
  imports: [],
  templateUrl: './rfid-reader.component.html',
  styleUrl: './rfid-reader.component.scss'
})
export class RfidReaderComponent implements OnInit{
  @Output() participant: EventEmitter<Participant> = new EventEmitter();
  constructor(private rfidService: RfidService, private participantManagementService: ParticipantManagementService) {}

  @HostBinding('class.reading')
  reading: boolean = false;

  ngOnInit(): void {
  }

  public async startReading(): Promise<void>{
    try {
      await this.rfidService.ensureReaderAvailable();
      this.reading = true;
      await this.rfidService.readUid()
        .then(async uid => {
          console.log(uid);
          const participant: Participant | null = await this.identifyParticipant(uid);
          if (participant) this.participant.emit(participant);
          this.stopReading();
        })
    }catch (error){
      console.log(error);
      this.stopReading();
    }
  }

  public stopReading(): void{
    this.reading = false;
  }

  private async identifyParticipant(uid: number[]): Promise<Participant | null>{
    console.log(uid.join(','));
    return (await this.participantManagementService.findByCardId(uid.join(','))) ?? null;
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.startReading();
  }
}
