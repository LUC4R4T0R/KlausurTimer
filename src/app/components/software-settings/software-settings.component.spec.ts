import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSettingsComponent } from './software-settings.component';

describe('ProgramSettingsComponent', () => {
  let component: SoftwareSettingsComponent;
  let fixture: ComponentFixture<SoftwareSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
