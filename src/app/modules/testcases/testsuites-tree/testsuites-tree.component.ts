import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Testsuite } from '../../../models/testsuite';
import { TestsuiteViewModel } from '../../../models/testsuite.viewmodel';

import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-testsuites-tree',
  templateUrl: './testsuites-tree.component.html',
  styleUrls: ['./testsuites-tree.component.css', './directory.css']
})
export class TestsuitesTreeComponent implements OnInit {

  testsuites: Testsuite[] = [];
  testsuitesViewModel: TestsuiteViewModel[];

  options = { idField: '_id' };

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  constructor() {

  }

  ngOnInit() {

    this.testsuites = [
      {
        '_id': 'root',
        'parentId': null,
        'projectId': 'projectId',
        'enabled': true,
        'name': 'First Test suite',
        'description': 'First testsuite description',
        'created': '10.05.2017',
        'updated': '10.05.2017',
        'createdBy': 'Admin',
        'updatedBy': 'Admin'
      },
      {
        '_id': 'second',
        'parentId': 'root',
        'projectId': 'projectId2',
        'enabled': true,
        'name': 'Second Test suite',
        'description': 'Second testsuite description',
        'created': '10.05.2017',
        'updated': '10.05.2017',
        'createdBy': 'Admin',
        'updatedBy': 'Admin'
      }
    ];

    this.testsuitesViewModel = [
      {
        'hasChildren': true,
        '_id': 'root',
        'parentId': null,
        'projectId': 'projectId',
        'enabled': true,
        'name': 'First Test suite',
        'description': 'First testsuite description'
      }
    ];

    this.buildTree();
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
    // this.updateTreeModel();
  }

  updateTreeModel() {

    // this.nodes.push({ name: 'another node' });
    // this.tree.treeModel.update();
  }

}


