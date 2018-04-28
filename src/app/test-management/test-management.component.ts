import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { pageTransition } from '../animations';
import { TranslateService } from '@ngx-translate/core';

import { TestCaseService } from './test-case.service';
import { TestSuiteService } from './test-suite.service';

import { TestCase, Priority } from './test-case';
import { TestSuite } from './test-suite';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationsService } from 'angular2-notifications';

import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  animations: [pageTransition]
})
export class TestManagementComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public projectId: string;
  public selectedTestCases = [];
  public selectedTestSuite: TestSuite;
  public testCases: TestCase[] = [];
  testSuitesViewModel = [];
  public testSuites: TestSuite[];

  public ascSort = ClrDatagridSortOrder.ASC;

  public testcase: TestCase;
  public priorities = Priority;
  keys; // Priority enumeration keys

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private testCaseService: TestCaseService,
    private testSuiteService: TestSuiteService,
    protected translateService: TranslateService,
    private notificationsService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params['id'];
      this.getTestSuites(this.projectId);
    });

    this.keys = Object.keys(this.priorities).filter(f => !isNaN(Number(f))).map(k => parseInt(k, 10));
  }

  openTestSuite(testSuite: TestSuite) {
    // TODO event emitter with suite id
    this.selectedTestSuite = testSuite;
    this.getTestCasesForTestSuite(testSuite._id);

  }

  getTestCasesForTestSuite(id: string) {
    this.testCaseService.getTestCasesBySuiteId(id).subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  getTestSuites(projectId: string) {
    this.testSuiteService.getTestSuitesByProjectId(projectId).subscribe(
      testsuites => {
        this.testSuites = testsuites;
        if (this.testSuites.length > 0) {
          this.fromFlatToTree();
        }
      },
      error => console.log(error)
    );
  }

  fromFlatToTree() {
    // build tree with childs from flat list
    const idToNodeMap = {};
    let rootNodes = 0;
    const root = [];
    let parentNode;

    for (let i = 0; i < this.testSuites.length; i++) {

      const node = this.testSuites[i];
      node['children'] = [];
      // View Model
      node['icon'] = 'folder';
      node['active'] = false;
      node['expanded'] = false;

      idToNodeMap[node._id] = node;

      if (node.parentId === 'root') {
        node['expanded'] = true;
        root[rootNodes] = node;
        rootNodes++;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
      }
    }

    this.testSuitesViewModel = [...root];
    // console.log(JSON.stringify(this.testSuites));
  }

  fromTreeToFlat() {
    // TODO
  }

  onAdd() {
    this.testcase = new TestCase();
    this.createOpened = true;
  }

  onEdit() {
    this.testcase = this.selectedTestCases[0];
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  createTestSuite() {

  }






  createTestCase() {
    this.testcase.testSuiteId = this.selectedTestSuite._id;
    this.testcase.projectId = this.selectedTestSuite.projectId;
    if (this.testCases.length > 0) {
      this.testcase.order = this.testCases.length + 1;
    } else {
      this.testcase.order = 0;
    }
    console.log(this.testcase);
    this.testCaseService.createTestCase(this.testcase).subscribe(
      response => {
        if (response.status === 201) {
          this.notificationsService.success('Test Case ' + this.testcase.title, 'created successfully!');
          this.testCases.push(this.testcase);
        }
      },
      error => console.log(error)
    );
  }

  updateTestCase() {
    this.testcase.testSuiteId = this.selectedTestSuite._id;
    this.testcase.projectId = this.selectedTestSuite.projectId;
    console.log(this.testcase);
    this.testCaseService.updateTestCase(this.testcase, this.testcase._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success('Test Case ' + this.testcase.title, 'updated successfully!');

          // update local array of testcases
          const foundIndex = this.testCases.findIndex(testcase => testcase._id === this.testcase._id);
          this.testCases[foundIndex] = this.testcase;

          // remove selection
          this.selectedTestCases = [];
        }
      },
      error => console.log(error)
    );
  }

  forceDelete() {
    this.selectedTestCases.forEach(selectedTestCase => {
      this.testCaseService.deleteTestCase(selectedTestCase._id).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationsService.success(
              selectedTestCase.title, this.translateService.instant('TESTMANAGEMENTPAGE.SUCCESSFULLY_DELETED'));
            this.testCases = this.testCases.filter(testCases => testCases !== selectedTestCase);
          }
        },
        error => console.log(error)
      );
    });
  }
}
