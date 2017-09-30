import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TreeModule } from 'angular-tree-component';

import { Testsuite } from '../../../models/testsuite';
import { Testcase } from '../../../models/testcase';
import { TestsuiteViewModel } from '../../../models/testsuite.viewmodel';

import { AuthenticationService, LocalStorageService } from '../../../services/auth/index';
import { TestsuiteService } from '../../../services/testsuite/testsuite.service';

import { TestsuitesTreeComponent } from './testsuites-tree.component';


describe('TestsuitesTreeComponent', () => {
  let component: TestsuitesTreeComponent;
  let fixture: ComponentFixture<TestsuitesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TreeModule
      ],
      declarations: [TestsuitesTreeComponent],
      providers: [
        TestsuiteService,
        AuthenticationService,
        LocalStorageService
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
