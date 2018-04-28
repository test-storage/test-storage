import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';

import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import { TestSuite } from './test-suite';
import { TestSuiteService } from './test-suite.service';

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
  testSuitesViewModel = [];

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
      }
    }

    this.testSuitesViewModel = [...root];
    // temporary
    this.openTestSuite(root[0].children[0]);
    // console.log(JSON.stringify(this.testSuites));
  }

  fromTreeToFlat() {
    // TODO
  }

}
