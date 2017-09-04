import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ClickOutDirective } from 'ngx-clickout';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { NotificationsComponent } from '../notifications/notifications.component';

import { AuthenticationService, LocalStorageService } from '../../../services/auth/index';
import { AuthGuard } from '../../../services/auth/auth-guard.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Mock localStorage
  beforeEach(async(() => {
    let store = {};

    store = {
      'authUser': {
        'firstName': 'John',
        'lastName': 'Doe',
        'username': 'myname',
        'title': 'admin'
      },
      'authToken': {
        'token': '32ea5456456456ea',
      }
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return JSON.stringify(store[key]) || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  }));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [
        HeaderComponent,
        NotificationsComponent,
        ClickOutDirective
      ],
      providers: [
        AuthenticationService,
        AuthGuard,
        LocalStorageService,
        NotificationsService,
        ThemeService,
        TranslateService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
