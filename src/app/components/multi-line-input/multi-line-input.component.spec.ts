import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineInputComponent } from './multi-line-input.component';

describe('MultiLineInputComponent', () => {
  let component: MultiLineInputComponent;
  let fixture: ComponentFixture<MultiLineInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLineInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
