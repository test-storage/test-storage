import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ValidateEqualDirective } from './validate-equal.directive';

@Component({
  template: `
  <form #form="ngForm">
  <div class="form-group">
    <input type="password" id="password" name="password" [(ngModel)]="user.password" #password="ngModel"
    required appValidateEqual="confirmPassword" reverse="true">
    </div>
    <div class="form-group">
    <input type="password" id="confirmPassword" name="confirmPassword" required
    [(ngModel)]="user.confirmPassword" #confirmPassword="ngModel" appValidateEqual="password">
    </div>
  </form>`
})
export class TestValidateEqualComponent {
  @ViewChild('form', { static: true})
  ngForm!: NgForm;

  public user = {
    password: '',
    confirmPassword: ''
  };
}

describe('ValidateEqualDirective', () => {
  let component: TestValidateEqualComponent;
  let fixture: ComponentFixture<TestValidateEqualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestValidateEqualComponent, ValidateEqualDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestValidateEqualComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should check passwords equality if set proper confirm password and password', (done) => {
    component.user.password = '1234567890';
    component.user.confirmPassword = '1234567890';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ngForm.form.get('confirmPassword')?.valid).toBeTruthy();
      done();
    });
  });

  it('should check validation when fields is empty', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ngForm.form.get('password')?.valid).toBe(false);
      expect(component.ngForm.form.get('password')?.errors?.required).toBe(true);
      expect(component.ngForm.form.get('confirmPassword')?.valid).toBe(false);
      expect(component.ngForm.form.get('confirmPassword')?.errors?.required).toBe(true);
      done();
    });
  });

  it('should check passwords equality if set wrong confirm password after a password', (done) => {
    component.user.password = '1234567890';
    component.user.confirmPassword = '1234567899';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ngForm.form.get('confirmPassword')?.valid).toBeFalsy();
      expect(component.ngForm.form.get('confirmPassword')?.errors?.notEqual).toBe(true);
      done();
    });
  });

  it('should check passwords equality if set wrong confirm password after a password', (done) => {
    component.user.confirmPassword = '1234567899';
    component.user.password = '1234567890';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ngForm.form.get('confirmPassword')?.valid).toBeFalsy();
      expect(component.ngForm.form.get('confirmPassword')?.errors?.notEqual).toBe(true);
      done();
    });
  });
});
