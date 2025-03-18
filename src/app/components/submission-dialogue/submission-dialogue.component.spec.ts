import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionDialogueComponent } from './submission-dialogue.component';

describe('SubmissionDialogueComponent', () => {
  let component: SubmissionDialogueComponent;
  let fixture: ComponentFixture<SubmissionDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
