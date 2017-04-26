import { async, ComponentFixture, inject, fakeAsync, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthenticationService } from '../../services/auth/authentication.service';

import { TestcasesComponent } from './testcases.component';
import { TestcaseService } from '../../services/testcase/testcase.service';
import { Testcase } from '../../models/testcase';
import { MockedTestcases } from '../../models/testcases.mock';


describe('TestcasesComponent', () => {
  let component: TestcasesComponent;
  let fixture: ComponentFixture<TestcasesComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [TestcasesComponent],
      providers: [Http,
        AuthenticationService,
        MockBackend,
        TestcaseService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestcasesComponent);
    component = fixture.componentInstance;

    // TestcaseService from the root injector
    TestBed.get(TestcaseService);


    fixture.detectChanges();
  }));

  it('should create', inject([TestcaseService], (testcaseService: TestcaseService) => {
    expect(component).toBeTruthy();
  }));

  it('should have proper url and method', inject([TestcaseService, MockBackend],
    (testcaseService: TestcaseService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe('/api/v1/testcases');
      });

      component.getTestcases();
    })
  );

  it('should parse the server response correctly', inject([TestcaseService, MockBackend],
    fakeAsync((testcaseService: TestcaseService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({ body: JSON.stringify(MockedTestcases) });
        connection.mockRespond(new Response(response));
      });

      component.getTestcases();

      expect(component.testcases.length).toBe(2);
      expect(component.testcases[0]._id).toEqual('94994594');
      expect(component.testcases[0].title).toEqual('Testcase 1');
    }))
  );
});
