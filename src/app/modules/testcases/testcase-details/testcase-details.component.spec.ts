import { async, ComponentFixture, inject, fakeAsync, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { TestcaseService } from '../../../services/testcase/testcase.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';

import { TestcaseDetailsComponent } from './testcase-details.component';

describe('TestcaseDetailsComponent', () => {
  let component: TestcaseDetailsComponent;
  let fixture: ComponentFixture<TestcaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestcaseDetailsComponent],
      providers: [
        TestcaseService,
        Http,
        AuthenticationService,
        MockBackend,
        TestcaseService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
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
