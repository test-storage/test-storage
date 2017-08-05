import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TreeModule } from 'angular-tree-component';

import { Testsuite } from '../../../models/testsuite';
import { Testcase } from '../../../models/testcase';
import { TestsuiteViewModel } from '../../../models/testsuite.viewmodel';

import { AuthenticationService } from '../../../services/auth/authentication.service';
import { TestsuiteService } from '../../../services/testsuite/testsuite.service';

import { TestsuitesTreeComponent } from './testsuites-tree.component';


describe('TestsuitesTreeComponent', () => {
  let component: TestsuitesTreeComponent;
  let fixture: ComponentFixture<TestsuitesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule],
      declarations: [TestsuitesTreeComponent],
      providers: [
        TestsuiteService,
        Http,
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
    fixture = TestBed.createComponent(TestsuitesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
