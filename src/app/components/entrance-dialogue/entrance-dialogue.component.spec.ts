import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceDialogueComponent } from './entrance-dialogue.component';

describe('EntranceDialogueComponent', () => {
  let component: EntranceDialogueComponent;
  let fixture: ComponentFixture<EntranceDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntranceDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
