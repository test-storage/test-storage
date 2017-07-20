import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';
import { ToastNotificationsService } from '../../../services/toast-notifications/toast-notifications.service';

import { AuthenticationService } from '../../../services/auth/authentication.service';
import { TestcaseService } from '../../../services/testcase/testcase.service';
import { TestcaseCreateComponent } from './testcase-create.component';

describe('TestcaseCreateComponent', () => {
  let component: TestcaseCreateComponent;
  let fixture: ComponentFixture<TestcaseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [TestcaseCreateComponent],
      providers: [
        ThemeService,
        NotificationsService,
        ToastNotificationsService,
        TestcaseService,
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
