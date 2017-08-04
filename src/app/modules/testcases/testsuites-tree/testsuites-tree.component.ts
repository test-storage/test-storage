import { Component, Input, OnInit } from '@angular/core';
import { Testsuite } from '../../../models/testsuite';

@Component({
  selector: 'app-testsuites-tree',
  templateUrl: './testsuites-tree.component.html',
  styleUrls: ['./testsuites-tree.component.css', './directory.css']
})
export class TestsuitesTreeComponent implements OnInit {

  testsuites: Testsuite[] = [];
  testsuitesArray: Testsuite[];

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

  }


  buildTree() {

    const idToNodeMap = {};
    let root = null;
    let parentNode;

    for (let i = 0; i < this.testsuites.length; i++) {

      let node = this.testsuites[i];
      node['children'] = [];
      idToNodeMap[node._id] = node;

      if (node.parentId === null) {
        root = node;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
      }
    }

    this.testsuitesArray = root;
    console.log(JSON.stringify(root));
  }

}


