import { Component, Input } from '@angular/core';
import { Toilet } from '../../models/toilet';
import { ToiletService } from '../../services/toilet.service';
import { ToiletState } from '../../models/toilet-state';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toilet-control',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './toilet-control.component.html',
  styleUrl: './toilet-control.component.scss'
})
export class ToiletControlComponent {
  @Input() index!: number;
  @Input() toilet!: Toilet;

  constructor(private toiletService: ToiletService) {
  }

  onChange() {
    this.toiletService.setToiletState(this.index, this.toilet.state);
  }

  protected readonly ToiletState = ToiletState;
}
