import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExamConfig } from '../../models/exam-config';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { cloneObject } from '../../lib/util';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-exam-settings',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './exam-settings.component.html',
  styleUrl: './exam-settings.component.scss'
})
export class ExamSettingsComponent implements OnInit{
  originalExamConfig!: ExamConfig;
  tempExamConfig!: ExamConfig
  tempDuration: string = '00:00:00';
  @ViewChild('examDurationInput') durationInput!: ElementRef;

  constructor(public timerService: TimerService, private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getExamConfig().subscribe((examConfig: ExamConfig) => {
      this.tempExamConfig = cloneObject(examConfig);
      this.originalExamConfig = cloneObject(examConfig);
      this.convertDuration();
    });
  }

  public saveChanges(): void{
    try {
      this.tempExamConfig.duration = this.hmToMilliseconds(this.tempDuration);
    }catch (error){
      this.durationInput.nativeElement.classList.add('invalid');
      throw error;
    }
    this.settingsService.setExamConfig(this.tempExamConfig);
  }

  public reset(): void {
    this.tempExamConfig = cloneObject(this.originalExamConfig);
    this.convertDuration();
  }

  private convertDuration(): void{
    this.tempDuration = this.millisecondsToHms(this.tempExamConfig.duration);
  }

  hmToMilliseconds(time: string): number{
    if(!/^\d{2}:\d{2}:\d{2}$/.test(time)) throw new Error('Input format of duration is invalid!');
    const [hours, minutes, seconds] = time.split(':');
    console.log(hours, minutes, seconds);
    return (parseInt(hours) * 60 + parseInt(minutes)) * 60000 + (parseInt(seconds) * 1000);
  }

  millisecondsToHms(milliseconds: number): string {
    const h: number = Math.floor(milliseconds / 3600000);
    const m: number = Math.floor((milliseconds % 3600000) / 60000);
    const s: number = Math.floor((milliseconds % 60000) / 1000);
    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;
    const sDisplay = s < 10 ? '0' + s : s;

    return hDisplay + ':' + mDisplay + ':' + sDisplay;
  }

  protected readonly ExamState = ExamState;
}
