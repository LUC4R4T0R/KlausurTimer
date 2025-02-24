import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEditorModalComponent } from './participant-editor-modal.component';

describe('EntranceModalComponent', () => {
  let component: ParticipantEditorModalComponent;
  let fixture: ComponentFixture<ParticipantEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantEditorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
