import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEditorComponent } from './participant-editor.component';

describe('EntranceDialogueComponent', () => {
  let component: ParticipantEditorComponent;
  let fixture: ComponentFixture<ParticipantEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
