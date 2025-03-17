import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { ModalComponent } from '../modal/modal.component';
import { DisplaySettingsComponent } from '../display-settings/display-settings.component';
import { ViewService } from '../../services/view.service';
import { SoftwareSettingsComponent } from '../software-settings/software-settings.component';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [
    ExamSettingsComponent,
    ModalComponent,
    DisplaySettingsComponent,
    SoftwareSettingsComponent,
  ],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss'
})
export class SettingsModalComponent implements OnInit{
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(ExamSettingsComponent) examSettings!: ExamSettingsComponent;
  @ViewChild(DisplaySettingsComponent) displaySettings!: DisplaySettingsComponent;
  @ViewChild(SoftwareSettingsComponent) softwareSettings!: SoftwareSettingsComponent;

  modalTitle: string = $localize`Einstellungen`;

  constructor(private viewService: ViewService) {
  }

  ngOnInit(): void {
    this.viewService.showSettingsModalSubject.subscribe(show => {
      if(show){
        this.open();
      }else {
        this.abort();
      }
    })
  }

  public open(): void{
    this.modal.open();
  }

  abort(): void{
    this.modal.close();
  }

  onClose(): void{
    this.examSettings.reset();
    this.displaySettings.reset();
  }

  saveChanges(): void{
    this.examSettings.saveChanges();
    this.displaySettings.saveChanges();
    this.softwareSettings.saveChanges();
    this.modal.close();
  }
}
