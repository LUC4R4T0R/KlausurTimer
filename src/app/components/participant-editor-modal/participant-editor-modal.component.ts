import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ParticipantEditorComponent } from '../participant-editor/participant-editor.component';

@Component({
  selector: 'app-participant-editor-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ParticipantEditorComponent,
  ],
  templateUrl: './participant-editor-modal.component.html',
  styleUrl: './participant-editor-modal.component.scss'
})
export class ParticipantEditorModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  public open(): void{
    this.modal.open();
  }

  onClose(): void {
    this.modal.close();
  }
}
