import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ElementRef, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutofocusDirective } from './autofocus.directive';

export class MockElementRef {
  nativeElement = {};
}

@Component({
  template: `
  <input type="text" [appAutofocus]=false>
  <input type="text" [appAutofocus]=true (focus)="onFocus()">`
})
export class TestAutoFocusComponent {
  onFocus($event) {
    console.log($event);
  }
}

describe('AutofocusDirective', () => {

  let component: TestAutoFocusComponent;
  let fixture: ComponentFixture<TestAutoFocusComponent>;
  let directives: DebugElement[];
  let focused: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAutoFocusComponent, AutofocusDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutoFocusComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    directives = fixture.debugElement.queryAll(By.directive(AutofocusDirective));
    focused = fixture.debugElement.queryAll(By.css(':focus'));
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

  xit('should check element with :focus exist', async () => {
    expect(focused.length).toBe(1);
  });
});
