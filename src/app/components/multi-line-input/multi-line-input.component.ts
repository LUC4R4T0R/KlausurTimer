import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-line-input',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './multi-line-input.component.html',
  styleUrl: './multi-line-input.component.scss'
})
export class MultiLineInputComponent{
  @Input() lines: string[] = [''];
  @Output() linesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChildren('input') inputElements!: QueryList<ElementRef<HTMLInputElement>>;

  handleChange(): void{
    this.linesChange.emit(this.lines);
  }

  addLine(newIndex: number = this.lines.length): void{
    this.lines.splice(newIndex, 0, '');
    this.handleChange();
    this.focusLine(newIndex);
  }

  checkEmpty(index: number, event: Event): void{
    if(this.lines[index].length > 0 || this.lines.length <= 1) return;
    event.preventDefault();
    this.removeLine(index); //if empty remove
  }

  removeLine(index: number): void{
    if(this.lines.length <= 1) return;
    this.lines.splice(index, 1);
    this.focusLine(index - 1);
  }

  trackByFn(index: number, item: string){
    return index;
  }

  focusLine(index: number): void{
    setTimeout(()=>{
      this.inputElements.get(index)?.nativeElement.focus();
    },0);
  }
}
