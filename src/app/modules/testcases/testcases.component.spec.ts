import { async, ComponentFixture, inject, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, RouterModule } from '@angular/router'; // TODO Remove
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TreeModule } from 'angular-tree-component';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService, LocalStorageService } from '../../services/auth/index';

import { TestcaseService } from '../../services/testcase/testcase.service';
import { TestsuiteService } from '../../services/testsuite/testsuite.service';

import { TestcasesComponent } from './testcases.component';
import { Testcase } from '../../models/testcase';
import { MockedTestcases } from '../../models/testcases.mock';

import { TestsuitesTreeComponent } from './testsuites-tree/testsuites-tree.component';


describe('TestcasesComponent', () => {
  let component: TestcasesComponent;
  let fixture: ComponentFixture<TestcasesComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule,
        BrowserAnimationsModule,
        FormsModule,
        TreeModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [TestcasesComponent, TestsuitesTreeComponent],
      providers: [
        AuthenticationService,
        LocalStorageService,
        TestsuiteService,
        TestcaseService,
        NotificationsService,
        ThemeService,
        TranslateService
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

  /*
  it('should have proper url and method', inject([TestcaseService, MockBackend],
    (testcaseService: TestcaseService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.url).toBe('/api/v1/testcases');
      });

      component.getTestcases();
    })
  );
*/

  /*
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

    */
});
