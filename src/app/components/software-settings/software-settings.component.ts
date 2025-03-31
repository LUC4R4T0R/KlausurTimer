import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { cloneObject } from '../../lib/util';
import { SoftwareConfig } from '../../models/software-config';
import { ExamState } from '../../models/exam-state';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-software-settings',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './software-settings.component.html',
  styleUrl: './software-settings.component.scss'
})
export class SoftwareSettingsComponent {
  originalSoftwareConfig!: SoftwareConfig;
  tempSoftwareConfig!: SoftwareConfig;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSoftwareConfig().subscribe((softwareConfig: SoftwareConfig) => {
      this.tempSoftwareConfig = cloneObject(softwareConfig);
      this.originalSoftwareConfig = cloneObject(softwareConfig);
    });
  }

  public saveChanges(): void{
    this.tempSoftwareConfig.enable_rfid = this.tempSoftwareConfig.enable_rfid && this.tempSoftwareConfig.extended_logging;
    this.settingsService.setSoftwareConfig(this.tempSoftwareConfig);
  }

  public reset(): void {
    this.tempSoftwareConfig = cloneObject(this.originalSoftwareConfig);
  }

  protected readonly ExamState = ExamState;
}
