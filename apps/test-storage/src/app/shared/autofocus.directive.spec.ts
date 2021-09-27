import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  template: `
  <input type="text" [appAutofocus]=false>
  <input type="text" class="focusable" [appAutofocus]=true>`
})
export class TestAutoFocusComponent { }

describe('AutofocusDirective', () => {

  let component: TestAutoFocusComponent;
  let fixture: ComponentFixture<TestAutoFocusComponent>;
  let directives: DebugElement[];
  let focused: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestAutoFocusComponent, AutofocusDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutoFocusComponent);
    component = fixture.componentInstance;

    focused = fixture.debugElement.query(By.css('input.focusable'));
    spyOn(focused.nativeElement, 'focus');
    fixture.detectChanges();

    directives = fixture.debugElement.queryAll(By.directive(AutofocusDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two autofocus elements', () => {
    expect(directives.length).toBe(2);
  });

  it('should set appAutofocus value to false', () => {
    const actual = directives[0].injector.get(AutofocusDirective) as AutofocusDirective;
    expect(actual.appAutofocus).toBe(false);
  });

  it('should set appAutofocus value to true', async () => {
    const actual = directives[1].injector.get(AutofocusDirective) as AutofocusDirective;
    expect(actual.appAutofocus).toBe(true);
  });

  it('should check element with :focus exist', async () => {
    expect(focused).toBeTruthy();
    expect(document.hasFocus());

    fixture.whenStable().then(() => {
      expect(focused.nativeElement.focus).toHaveBeenCalled();
    });
  });
});
