import { Component, OnInit } from '@angular/core';
import { NumberInputComponent } from '../number-input/number-input.component';
import { ToiletService } from '../../services/toilet.service';

@Component({
  selector: 'app-toilet-queue-controls',
  standalone: true,
  imports: [
    NumberInputComponent,
  ],
  templateUrl: './toilet-queue-controls.component.html',
  styleUrl: './toilet-queue-controls.component.scss'
})
export class ToiletQueueControlsComponent implements OnInit {
  toiletQueueSize: number = 0;

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.toiletService.getToiletQueue().subscribe(size => this.toiletQueueSize = size);
  }

  setToiletQueueSize(value: number|undefined): void {
    this.toiletService.setToiletQueue(value ?? 0);
  }
}
