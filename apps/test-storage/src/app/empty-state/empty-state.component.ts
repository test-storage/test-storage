import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  @Input()
  title!: string;

  @Input()
  description!: string;

  @Input()
  buttonText!: string;

  @Input()
  image!: string;

  @Input()
  icon!: string;

  onClickButton(): void {
    this.clicked.emit();
  }

}
