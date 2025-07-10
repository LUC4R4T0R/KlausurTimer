import { Component, ViewChild } from '@angular/core';
import { DisplaySettingsComponent } from '../display-settings/display-settings.component';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note';
import { cloneObject } from '../../lib/util';
import { NotesService } from '../../services/notes.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [
    DisplaySettingsComponent,
    ExamSettingsComponent,
    ModalComponent,
    FormsModule,
    NgIf,
  ],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.scss'
})
export class NoteModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  id?: string;
  note: Note = {title: '', content: '', author: ''};

  modalTitle: string = $localize`Hinweis`;

  constructor(private notesService: NotesService) {
  }

  public open(id?: string, note?: Note): void{
    if(id){
      this.id = id;
      this.note = cloneObject(note);
    }else{
      this.id = undefined;
      this.note = {title: '', content: '', author: ''};
    }
    this.modal.open();
  }

  abort(): void{
    this.modal.close();
  }

  onClose(): void{

  }

  saveChanges(): void{
    if(this.id){
      this.notesService.updateNote(this.id, this.note as Note);
    }else{
      this.notesService.addNote(this.note as Note);
    }
    this.modal.close();
  }
}
