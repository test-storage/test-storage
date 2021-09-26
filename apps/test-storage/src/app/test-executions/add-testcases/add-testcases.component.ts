import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { pageTransition } from '../../animations';

import { TestrunsService } from '../test-executions.service';
import { Testrun } from '../testrun';

import { TestSuiteService } from '../../test-management/test-suite.service';
import { TestSuite } from './../../test-management/test-suite';
import { TestSuiteViewModel } from './../../test-management/test-suite-view-model';

import { ClrSelectedState } from '@clr/angular';


@Component({
  selector: 'app-add-testcases',
  templateUrl: './add-testcases.component.html',
  styleUrls: ['./add-testcases.component.css'],
  animations: [pageTransition]
})
export class AddTestcasesComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  testrunId!: string;
  testrun!: Testrun;
  subscription!: Subscription;

  testSuites!: TestSuite[];
  selected: any;
  selectedTestSuite!: TestSuiteViewModel;

  testSuitesViewModel: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private testrunService: TestrunsService,
    private testsuiteService: TestSuiteService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testrunId = params.id;
      this.getTestrun(this.testrunId);
      this.route.parent?.parent?.params.subscribe(mParams => {
        this.getTestSuites(mParams.id);
      });
    });
  }

  ngOnDestroy(): void {
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
      // @ts-ignore
      node.selected = ClrSelectedState.UNSELECTED;

      idToNodeMap[node._id as string] = node;

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
    if (!this.selected) {
      this.openTestSuite(root[0]);
    }
  }

  getChildren(testsuite: TestSuite): TestSuite {
    return testsuite.children;
  }


  openTestSuite(testSuite: TestSuite): void {
    this.selectedTestSuite = testSuite;
  }

  onSave(): void {
    console.log('save');
  }



}
