import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { pageTransition } from '../animations';

import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ToastNotificationsService } from '../shared/toast-notifications.service';

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

  public projectId!: string;
  selectedTestSuite!: TestSuiteViewModel;
  public testSuites!: TestSuite[];
  testSuitesViewModel: TestSuiteViewModel[] = [];

  createOpened = false;
  editOpened = false;
  deleteOpened = false;

  constructor(
    protected translateService: TranslateService,
    private notificationsService: ToastNotificationsService,
    private testSuiteService: TestSuiteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.projectId = params.id;
      this.getTestSuites(this.projectId);
    });
  }

  getTestSuites(projectId: string): void {
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

  openTestSuite(testSuite: TestSuite): void {
    this.selectedTestSuite = testSuite;
  }

  fromFlatToTree(): void {
    // build tree with childs from flat list
    const idToNodeMap: any = {};
    let rootNodes = 0;
    const root = [];
    let parentNode;

    for (const testsuite of this.testSuites) {

      const node: TestSuiteViewModel = testsuite;
      node.children = [];
      // View Model
      node.icon = 'folder';
      node.active = false;
      node.expanded = false;

      idToNodeMap[node._id as any] = node;

      if (node.parentId === 'root') {
        node.expanded = true;
        node.active = true;
        root[rootNodes] = node;
        rootNodes++;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
        parentNode.expanded = true;
      }
    }

    this.testSuitesViewModel = [...root];
    if (!this.selectedTestSuite) {
      this.openTestSuite(root[0]);
    }
  }

  getChildren(testsuite: TestSuite): TestSuite {
    return testsuite.children;
  }

  onAdd(testsuite?: TestSuite): void {
    if (testsuite) {
      this.selectedTestSuite = testsuite;
    } else {
      this.selectedTestSuite = new TestSuite();
      this.selectedTestSuite.projectId = this.projectId;
      this.selectedTestSuite._id = 'root';
    }
    this.createOpened = true;
  }

  onEdit(testsuite: TestSuite): void {
    this.selectedTestSuite = testsuite;
    this.editOpened = true;
  }

  onDelete(testsuite: TestSuite): void {
    this.selectedTestSuite = testsuite;
    this.deleteOpened = true;
  }

  createTestSuite(testsuite: TestSuite): void {
    testsuite.parentId = this.selectedTestSuite._id as string;
    testsuite.projectId = this.selectedTestSuite.projectId;
    if (this.testSuites.length > 0) {
      testsuite.order = this.testSuites.length + 1;
    } else {
      testsuite.order = 0;
    }

    this.testSuiteService.createTestSuite(testsuite).subscribe(
      (response: HttpResponse<TestSuite>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(testsuite.name);

          this.testSuites.push(response.body as TestSuite);
          this.fromFlatToTree();
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateTestSuite(testsuite: TestSuite): void {
    testsuite.projectId = this.selectedTestSuite.projectId;

    this.testSuiteService.updateTestSuite(testsuite, testsuite._id).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyCreated(testsuite.name);

          // update local array
          const foundIndex = this.testSuites.findIndex(mTestsuite => mTestsuite._id === testsuite._id);
          this.testSuites[foundIndex] = testsuite;
          this.fromFlatToTree();
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  forceDelete($event: any): void {
    this.testSuiteService.deleteTestSuite(this.selectedTestSuite._id as string).subscribe(
      response => {
        if (response.status === 200) {
          this.notificationsService.successfullyUpdated(this.selectedTestSuite.name);

          this.testSuites = this.testSuites.filter(testSuites => testSuites._id !== this.selectedTestSuite._id);
          this.fromFlatToTree();
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }
}
