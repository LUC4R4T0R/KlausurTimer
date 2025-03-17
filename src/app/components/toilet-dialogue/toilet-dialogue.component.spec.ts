import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletDialogueComponent } from './toilet-dialogue.component';

describe('ToiletDialogueComponent', () => {
  let component: ToiletDialogueComponent;
  let fixture: ComponentFixture<ToiletDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
