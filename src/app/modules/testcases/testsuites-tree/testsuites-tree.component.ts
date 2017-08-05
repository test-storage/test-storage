import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Testsuite } from '../../../models/testsuite';
import { TestsuiteViewModel } from '../../../models/testsuite.viewmodel';

import { TestsuiteService } from '../../../services/testsuite/testsuite.service';

// import { MockFactory } from '../../../../../test/server/integration/mocks/mock.factory';


@Component({
  selector: 'app-testsuites-tree',
  templateUrl: './testsuites-tree.component.html',
  styleUrls: ['./testsuites-tree.component.css']
})
export class TestsuitesTreeComponent implements OnInit {

  testsuite: Testsuite = new Testsuite();
  testsuites: Testsuite[] = [];
  testsuitesViewModel: TestsuiteViewModel[];

  options = { idField: '_id' };

  constructor(
    private testsuiteService: TestsuiteService
  ) {

  }

  ngOnInit() {

    this.testsuitesViewModel = [
      {
        'hasChildren': true,
        '_id': 'root',
        'parentId': null,
        'projectId': 'projectId',
        'enabled': true,
        'name': 'Root Test suite',
        'description': 'Root testsuite description'
      }
    ];

    this.getTestsuites();
  }

  getTestsuites() {
    this.testsuiteService.getTestsuites().subscribe(
      testsuites => {
        this.testsuites = testsuites;
        if (this.testsuites.length > 0) {
          this.buildTree();
        }
      },
      error => console.log(error)
    );
  }


  buildTree() {

    const idToNodeMap = {};
    const root = [];
    let parentNode;

    for (let i = 0; i < this.testsuites.length; i++) {

      const node = this.testsuites[i];
      node['children'] = [];
      idToNodeMap[node._id] = node;

      if (node.parentId === null) {
        root[0] = node;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
      }
    }

    this.testsuitesViewModel = [...root];
    // console.log(JSON.stringify(this.testsuites));
  }

  createNewTestsuite() {

    // const mockFactory = new MockFactory();
    // this.testsuite = mockFactory.createTestsuite();
    this.testsuite.parentId = '9d04b25ccdcbd9f71cf87ffc28dfe98f';

    this.testsuiteService.createTestsuite(this.testsuite).subscribe(
      response => {
        if (response === 201) {
          // this.toastNotificationsService.success('Testsuite ' + this.testcase.title, 'created successfully!');

          // this.router.navigate(['./testcases']);
        }
      },
      error => console.log(error)
    );
  }

}


