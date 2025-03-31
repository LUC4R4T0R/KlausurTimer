import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  @HostBinding('class.closed')
  public hideModal: boolean = true;
  @Input() initiallyOpen: boolean = false;
  @Input() title: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    if (this.initiallyOpen) {
      this.open();
    }
  }

  public close(): void{
    this.hideModal = true;
    this.onClose.emit();
  }

  public open(): void{
    this.hideModal = false;
  }
}
