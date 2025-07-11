import { Component, OnInit } from '@angular/core';
import { DisplayConfig } from '../../models/display-config';
import { FormsModule } from '@angular/forms';
import { ToiletService } from '../../services/toilet.service';
import { SettingsService } from '../../services/settings.service';
import { cloneObject } from '../../lib/util';
import { NumberInputComponent } from '../number-input/number-input.component';

@Component({
  selector: 'app-display-settings',
  standalone: true,
  imports: [
    FormsModule,
    NumberInputComponent,
  ],
  templateUrl: './display-settings.component.html',
  styleUrl: './display-settings.component.scss'
})
export class DisplaySettingsComponent implements OnInit{
  originalDisplayConfig!: DisplayConfig;
  tempDisplayConfig!: DisplayConfig

  constructor(private toiletService: ToiletService, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.getDisplayConfig().subscribe((displayConfig: DisplayConfig) => {
      this.tempDisplayConfig = cloneObject(displayConfig);
      this.originalDisplayConfig = cloneObject(displayConfig);
    });
  }

  public reset(): void{
    this.tempDisplayConfig = cloneObject(this.originalDisplayConfig);
  }

  public saveChanges(): void{
    this.settingsService.setDisplayConfig(this.tempDisplayConfig);
  }
}
