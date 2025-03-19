import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamSettingsComponent } from '../../components/exam-settings/exam-settings.component';
import { TimerComponent } from '../../components/timer/timer.component';
import { ToiletControlsComponent } from '../../components/toilet-controls/toilet-controls.component';
import { DisplaySettingsComponent } from '../../components/display-settings/display-settings.component';
import { EventLogComponent } from '../../components/event-log/event-log.component';
import { TimerControlsComponent } from '../../components/timer-controls/timer-controls.component';
import { ViewService } from '../../services/view.service';
import { WindowType } from '../../models/window-type';
import { DurationDisplayComponent } from '../../components/duration-display/duration-display.component';
import { BonusModalComponent } from '../../components/bonus-modal/bonus-modal.component';
import { NotesDisplayComponent } from '../../components/notes-display/notes-display.component';
import { NoteModalComponent } from '../../components/note-modal/note-modal.component';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { EntranceDialogueComponent } from '../../components/entrance-dialogue/entrance-dialogue.component';
import { ToiletDialogueComponent } from '../../components/toilet-dialogue/toilet-dialogue.component';
import { SoftwareConfig } from '../../models/software-config';
import { SoftwareSettingsComponent } from '../../components/software-settings/software-settings.component';
import { SubmissionDialogueComponent } from '../../components/submission-dialogue/submission-dialogue.component';
import { LogExportService } from '../../services/log-export.service';

@Component({
  selector: 'app-control-page',
  standalone: true,
  imports: [
    ExamSettingsComponent,
    TimerComponent,
    ToiletControlsComponent,
    DisplaySettingsComponent,
    EventLogComponent,
    TimerControlsComponent,
    DurationDisplayComponent,
    BonusModalComponent,
    NotesDisplayComponent,
    NoteModalComponent,
    NgIf,
    EntranceDialogueComponent,
    ToiletDialogueComponent,
    SoftwareSettingsComponent,
    SubmissionDialogueComponent,
  ],
  templateUrl: './control-page.component.html',
  styleUrl: './control-page.component.scss'
})
export class ControlPageComponent implements OnInit{
  softwareConfig!: SoftwareConfig;

  constructor(
    private viewService: ViewService,
    private settingsService: SettingsService,
    private logExportService: LogExportService
  ) {
  }

  ngOnInit(): void {
    this.viewService.hideSettingsModal();
    this.viewService.setWindowType(WindowType.REMOTE_CONTROL);
    this.settingsService.getSoftwareConfig().subscribe((softwareConfig: SoftwareConfig) => {
      this.softwareConfig = softwareConfig;
    });
  }

  exportLog(): void{
    this.logExportService.printLog();
  }
}
