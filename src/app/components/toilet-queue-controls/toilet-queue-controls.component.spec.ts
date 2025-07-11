import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletQueueControlsComponent } from './toilet-queue-controls.component';

describe('ToiletQueueControlsComponent', () => {
  let component: ToiletQueueControlsComponent;
  let fixture: ComponentFixture<ToiletQueueControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletQueueControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletQueueControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
