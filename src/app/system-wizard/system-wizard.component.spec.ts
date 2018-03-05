import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemWizardComponent } from './system-wizard.component';

describe('SystemWizardComponent', () => {
  let component: SystemWizardComponent;
  let fixture: ComponentFixture<SystemWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
