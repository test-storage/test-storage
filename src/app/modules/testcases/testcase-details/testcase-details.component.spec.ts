import { async, ComponentFixture, inject, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router'; // TODO remove
import { Observable } from 'rxjs/Rx';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService, LocalStorageService } from '../../../services/auth/index';

import { TestcaseService } from '../../../services/testcase/testcase.service';
import { TestcaseDetailsComponent } from './testcase-details.component';

describe('TestcaseDetailsComponent', () => {
  let component: TestcaseDetailsComponent;
  let fixture: ComponentFixture<TestcaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [TestcaseDetailsComponent],
      providers: [
        AuthenticationService,
        LocalStorageService,
        TestcaseService,
        NotificationsService,
        ThemeService,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 123 })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
