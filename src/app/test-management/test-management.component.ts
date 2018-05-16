import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../animations';

import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import { TestSuite } from './test-suite';
import { TestSuiteService } from './test-suite.service';
import { TestSuiteViewModel } from './test-suite-view-model';

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
  selectedTestSuite: TestSuite;
  public testSuites: TestSuite[];
  testSuitesViewModel: TestSuiteViewModel[] = [];

  createOpened = false;
  editOpened = false;
  deleteOpened = false;

  constructor(
    protected translateService: TranslateService,
    private notificationsService: NotificationsService,
    private testSuiteService: TestSuiteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params['id'];
      this.getTestSuites(this.projectId);
    });
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

  openTestSuite(testSuite: TestSuite) {
    this.selectedTestSuite = testSuite;
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
        parentNode['expanded'] = true;
      }
    }

    this.testSuitesViewModel = [...root];
    if (!this.selectedTestSuite) {
      this.openTestSuite(root[0]);
    }
  }

  onAdd(testsuite?: TestSuite) {
    event.stopPropagation();
    if (testsuite) {
      this.selectedTestSuite = testsuite;
    } else {
      this.selectedTestSuite = new TestSuite();
      this.selectedTestSuite.projectId = this.projectId;
      this.selectedTestSuite._id = 'root';
    }
    this.createOpened = true;
  }

  onEdit(testsuite: TestSuite) {
    event.stopPropagation();
    this.selectedTestSuite = testsuite;
    this.editOpened = true;
  }

  onDelete(testsuite: TestSuite) {
    event.stopPropagation();
    this.selectedTestSuite = testsuite;
    this.deleteOpened = true;
  }

  createTestSuite(testsuite: TestSuite) {
    testsuite.parentId = this.selectedTestSuite._id;
    testsuite.projectId = this.selectedTestSuite.projectId;
    if (this.testSuites.length > 0) {
      testsuite.order = this.testSuites.length + 1;
    } else {
      testsuite.order = 0;
    }

    this.testSuiteService.createTestSuite(testsuite).subscribe(
      (response: HttpResponse<TestSuite>) => {
        if (response.status === 201) {
          this.notificationsService.success(
            testsuite.name,
            this.translateService.instant('COMMON.SUCCESSFULLY_CREATED')
          );
          testsuite._id = response.body._id;
          this.testSuites.push(testsuite);
          this.fromFlatToTree();
        }
      },
      error => console.log(error)
    );
  }

  updateTestSuite(testsuite: TestSuite) {
    // testsuite.parentId = this.selectedTestSuite._id;
    testsuite.projectId = this.selectedTestSuite.projectId;

    this.testSuiteService.updateTestSuite(testsuite, testsuite._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            testsuite.name,
            this.translateService.instant('COMMON.SUCCESSFULLY_UPDATED')
          );

          // update local array of testsuites
          const foundIndex = this.testSuites.findIndex(mTestsuite => mTestsuite._id === testsuite._id);
          this.testSuites[foundIndex] = testsuite;
          this.fromFlatToTree();
        }
      },
      error => console.log(error)
    );
  }

  forceDelete($event) {
    this.testSuiteService.deleteTestSuite(this.selectedTestSuite._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.success(
            this.selectedTestSuite.name,
            this.translateService.instant('COMMON.SUCCESSFULLY_DELETED')
          );
          this.testSuites = this.testSuites.filter(testSuites => testSuites._id !== this.selectedTestSuite._id);
          this.fromFlatToTree();
        }
      },
      error => console.log(error)
    );
  }
}
