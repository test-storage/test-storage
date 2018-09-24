import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { pageTransition } from '../../animations';

import { TestrunsService } from '../test-executions.service';
import { Testrun } from '../testrun';

import { TestSuiteService } from '../../test-management/test-suite.service';
import { TestSuite } from './../../test-management/test-suite';


@Component({
  selector: 'app-add-testcases',
  templateUrl: './add-testcases.component.html',
  styleUrls: ['./add-testcases.component.css'],
  animations: [pageTransition]
})
export class AddTestcasesComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  testrunId: string;
  testrun: Testrun;
  subscription: Subscription;

  testSuites: TestSuite[];
  selected: any;

  testSuitesViewModel: any[] = [
    {
      name: 'Applications',
      icon: 'folder',
      expanded: true,
      selected: true,
      children: [
        {
          icon: 'calendar',
          name: 'Calendar',
          selected: true
        },
        {
          icon: 'line-chart',
          name: 'Charts',
          selected: false
        },
        {
          icon: 'dashboard',
          name: 'Dashboard',
          selected: false
        },
        {
          icon: 'map',
          name: 'Maps',
          selected: false
        }
      ]
    },
    {
      name: 'Files',
      icon: 'folder',
      expanded: false,
      selected: false,
      children: [
        {
          icon: 'file',
          name: 'Cover Letter.doc',
          selected: false
        }
      ]
    },
    {
      name: 'Images',
      icon: 'folder',
      selected: false,
      expanded: false,
      children: [
        {
          icon: 'image',
          name: 'Screenshot.png',
          selected: false
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private testrunService: TestrunsService,
    private testsuiteService: TestSuiteService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.testrunId = params['id'];
      this.getTestrun(this.testrunId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTestrun(id: string) {
    this.subscription = this.testrunService.getTestrun(id).subscribe(
      data => this.testrun = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  getTestSuites(projectId: string) {
    this.testsuiteService.getTestSuitesByProjectId(projectId).subscribe(
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
        node['active'] = true;
        root[rootNodes] = node;
        rootNodes++;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
        parentNode['expanded'] = true;
      }
    }

    this.testSuitesViewModel = [...root];
    if (!this.selected) {
      // this.openTestSuite(root[0]);
    }
  }



}
