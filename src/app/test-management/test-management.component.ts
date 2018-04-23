import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';
import { TranslateService } from '@ngx-translate/core';

import { TestCaseService } from './test-case.service';
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

  public testcases = [
    {
      name: 'Импорт валидных геозон из файла'
    },
    {
      name: 'Экспорт валидных геозон'
    },
    {
      name: 'Валидация геозон'
    },
    {
      name: 'Удаление геозон'
    }

  ];

  testSuitesViewModel = [];
  testSuites: any[] = [
    {
      name: 'Main Features',
      icon: 'folder',
      expanded: true,
      children: [
        {
          icon: 'folder',
          name: 'Authentication',
          active: false
        },
        {
          icon: 'folder',
          name: 'Messaging',
          active: false
        },
        {
          icon: 'folder',
          name: 'Dashboard',
          active: false
        },
        {
          icon: 'folder',
          name: 'Maps',
          active: true
        }
      ]
    },
    {
      name: 'REST API',
      icon: 'folder',
      expanded: false,
      children: [
        {
          icon: 'folder',
          name: 'Authentication',
          active: false
        }
      ]
    },
    {
      name: 'Non-functional',
      icon: 'folder',
      expanded: false,
      children: [
        {
          icon: 'folder',
          name: 'Messaging',
          active: false
        }
      ]
    }
  ];

  openTestSuite(testSuiteName: string, child: string) {
    // TODO event emitter with suite id
  }

  constructor(
    private testCaseService: TestCaseService,
    private testSuiteService: TestSuiteService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getTestSuites();
  }

  getTestSuites() {
    this.testSuiteService.getTestSuites().subscribe(
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

}
