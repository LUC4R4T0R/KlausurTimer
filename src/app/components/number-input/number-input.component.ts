import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent {
  @Input() value: number|undefined;
  @Input() min: number|null = null;
  @Input() max: number|null = null;
  @Input() step: number = 1;
  @Output() valueChange = new EventEmitter<number|undefined>();

  increment(): void {
    this.setValue((this.value ?? 0) + this.step);
  }

  decrement(): void {
    this.setValue((this.value ?? 0) - this.step);
  }

  setValue(value: number): void {
    if((this.min !== null ? value < this.min : false) || (this.max !== null ? value > this.max : false)) return;
    this.value = value;
    this.valueChange.emit(this.value);
  }

  canDecrement(): boolean {
    return this.min !== null ? ((this.value ?? 0) - this.step) >= this.min : true;
  }

  canIncrement(): boolean {
    return this.max !== null ? ((this.value ?? 0) + this.step) <= this.max : true;
  }
}
