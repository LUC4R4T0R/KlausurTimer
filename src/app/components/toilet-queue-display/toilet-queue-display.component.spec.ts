import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletQueueDisplayComponent } from './toilet-queue-display.component';

describe('ToiletQueueDisplayComponent', () => {
  let component: ToiletQueueDisplayComponent;
  let fixture: ComponentFixture<ToiletQueueDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletQueueDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletQueueDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
