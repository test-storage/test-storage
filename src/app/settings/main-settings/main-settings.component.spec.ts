import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSettingsComponent } from './main-settings.component';

describe('MainSettingsComponent', () => {
  let component: MainSettingsComponent;
  let fixture: ComponentFixture<MainSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
