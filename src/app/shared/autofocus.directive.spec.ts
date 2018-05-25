import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';

export class MockElementRef {
  nativeElement = {};
}

@Component({
  template: `<input type="text" [appAutofocus]=false>`
})
export class TestAutoFocusComponent {}

describe('AutofocusDirective', () => {

  let component: TestAutoFocusComponent;
  let fixture: ComponentFixture<TestAutoFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAutoFocusComponent, AutofocusDirective ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutoFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  afterEach(() => {
    // inputEl.nativeElement.appAutofocus = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set appAutofocus value to true', async () => {

    inputEl.nativeElement.appAutofocus = true;
    fixture.detectChanges();
    expect(inputEl.nativeElement.appAutofocus).toBe(true);
  });

  xit('should check for focus() event to have been called', () => {
    spyOn(inputEl.nativeElement, 'focus');

    inputEl.nativeElement.appAutofocus = true;
    fixture.detectChanges();

    expect(inputEl.nativeElement.focus).toHaveBeenCalled();
  });
});
