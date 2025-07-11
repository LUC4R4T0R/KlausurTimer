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
import { SettingsModalComponent } from '../../components/settings-modal/settings-modal.component';
import { BonusModalComponent } from '../../components/bonus-modal/bonus-modal.component';
import { NotesDisplayComponent } from '../../components/notes-display/notes-display.component';
import { NoteModalComponent } from '../../components/note-modal/note-modal.component';
import { ToiletQueueControlsComponent } from '../../components/toilet-queue-controls/toilet-queue-controls.component';

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
    SettingsModalComponent,
    BonusModalComponent,
    NotesDisplayComponent,
    NoteModalComponent,
    ToiletQueueControlsComponent,
  ],
  templateUrl: './control-page.component.html',
  styleUrl: './control-page.component.scss'
})
export class ControlPageComponent implements OnInit{
  constructor(private viewService: ViewService) {
  }

  ngOnInit(): void {
    this.viewService.hideSettingsModal();
    this.viewService.setWindowType(WindowType.REMOTE_CONTROL);
  }
}
