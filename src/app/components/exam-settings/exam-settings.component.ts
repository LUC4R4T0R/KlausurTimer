import { Component, OnInit } from '@angular/core';
import { ExamConfig } from '../../models/exam-config';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { ExamState } from '../../models/exam-state';
import { cloneObject } from '../../lib/util';
import { SettingsService } from '../../services/settings.service';
import { MultiLineInputComponent } from '../multi-line-input/multi-line-input.component';

@Component({
  selector: 'app-exam-settings',
  standalone: true,
  imports: [
    FormsModule,
    MultiLineInputComponent,
  ],
  templateUrl: './exam-settings.component.html',
  styleUrl: './exam-settings.component.scss'
})
export class ExamSettingsComponent implements OnInit{
  originalExamConfig!: ExamConfig;
  tempExamConfig!: ExamConfig
  tempDuration: string = '00:00';

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
    this.tempExamConfig.duration = this.hmToMilliseconds(this.tempDuration);
    this.settingsService.setExamConfig(this.tempExamConfig);
  }

  public reset(): void {
    this.tempExamConfig = cloneObject(this.originalExamConfig);
    this.convertDuration();
  }

  private convertDuration(): void{
    this.tempDuration = this.millisecondsToHm(this.tempExamConfig.duration);
  }

  hmToMilliseconds(time: string): number{
    const [hours, minutes] = time.split(':');
    return (parseInt(hours) * 60 + parseInt(minutes)) * 60000;
  }

  millisecondsToHm(milliseconds: number): string {
    const h: number = Math.floor(milliseconds / 3600000);
    const m: number = Math.floor((milliseconds % 3600000) / 60000);
    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;

    return hDisplay + ':' + mDisplay;
  }

  protected readonly ExamState = ExamState;
}
