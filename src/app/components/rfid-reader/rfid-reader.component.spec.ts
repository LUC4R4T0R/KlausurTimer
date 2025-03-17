import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidReaderComponent } from './rfid-reader.component';

describe('RfidReaderComponent', () => {
  let component: RfidReaderComponent;
  let fixture: ComponentFixture<RfidReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RfidReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
