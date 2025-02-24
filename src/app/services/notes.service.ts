import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: {[key: string]: Note} = {};
  //private notesSubject: Subject<{[key: string]: Note}> = new BehaviorSubject<{[key: string]: Note}>({});

  constructor() {
    addEventListener('storage', (event: StorageEvent) => this.handleStorageEvent(event));
    this.loadNotes();
  }

  public getNotes(): {[key: string]: Note} {
    return this.notes;
  }

  private pushNoteChanges(): void{
    //this.notesSubject.next(this.notes);
    this.storeNotes();
  }

  public addNote(note: Note): string {
    const id = uuid();
    note.created_at = note.last_update = new Date();
    this.notes[id] = note;
    this.pushNoteChanges();
    return id;
  }

  public updateNote(id: string, note: Note){
    note.last_update = new Date();
    this.notes[id] = note;
    this.pushNoteChanges();
  }

  public deleteNote(id: string): void {
    delete this.notes[id];
    this.pushNoteChanges();
  }

  private loadNotes(): void{
    const val: string | null = localStorage.getItem('notes');
    if(val === null) this.notes = {};
    else this.notes = JSON.parse(val as string);
    //this.notesSubject.next(this.notes);
  }

  private storeNotes(): void{
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  private handleStorageEvent(event: StorageEvent): void{
    if(event.key === 'notes') this.loadNotes();
  }
}
