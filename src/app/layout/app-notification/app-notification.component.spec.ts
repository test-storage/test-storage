import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNotificationComponent } from './app-notification.component';

describe('AppNotificationComponent', () => {
  let component: AppNotificationComponent;
  let fixture: ComponentFixture<AppNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
