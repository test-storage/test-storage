import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnChanges {

  @Input() appAutofocus!: boolean;
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appAutofocus.currentValue) {
      setTimeout(() => this.el.focus(), 0);
    }
  }
}
