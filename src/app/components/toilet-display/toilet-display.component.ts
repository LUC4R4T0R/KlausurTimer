import { Component, OnInit } from '@angular/core';
import { ToiletStateComponent } from '../toilet-state/toilet-state.component';
import { NgForOf, NgIf } from '@angular/common';
import { Toilet } from '../../models/toilet';
import { ToiletService } from '../../services/toilet.service';
import { ToiletQueueDisplayComponent } from '../toilet-queue-display/toilet-queue-display.component';

@Component({
  selector: 'app-toilet-display',
  standalone: true,
  imports: [
    ToiletStateComponent,
    NgForOf,
    NgIf,
    ToiletQueueDisplayComponent,
  ],
  templateUrl: './toilet-display.component.html',
  styleUrl: './toilet-display.component.scss'
})
export class ToiletDisplayComponent implements OnInit{
  toilets: Toilet[] = [];
  queueSize: number = 0;

  constructor(private toiletService: ToiletService) {
  }

  ngOnInit(): void {
    this.toiletService.getToilets().subscribe((toilets: Toilet[]) => this.toilets = toilets);
    this.toiletService.getToiletQueue().subscribe((queueSize: number) => this.queueSize = queueSize);
  }
}
