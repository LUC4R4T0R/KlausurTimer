import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ToiletService } from '../../services/toilet.service';

@Component({
  selector: 'app-toilet-queue-display',
  standalone: true,
    imports: [
        NgIf,
    ],
  templateUrl: './toilet-queue-display.component.html',
  styleUrl: './toilet-queue-display.component.scss'
})
export class ToiletQueueDisplayComponent implements OnInit {
  queueSize: number = 0;

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.toiletService.getToiletQueue().subscribe(queueSize => this.queueSize = queueSize);
  }
}
