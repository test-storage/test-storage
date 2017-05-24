import { Component, Input, OnInit } from '@angular/core';
import { Testsuite } from '../../../models/testsuite';
import { TreeModule } from 'angular-tree-component';

@Component({
  selector: 'app-testsuites-tree',
  templateUrl: './testsuites-tree.component.html',
  styleUrls: ['./testsuites-tree.component.css']
})
export class TestsuitesTreeComponent implements OnInit {

  nodes: Testsuite[] = [];

  constructor() {

  }

  ngOnInit() {

    this.nodes = [
      {
        '_id': 1,
        'parentId': 1,
        'projectId': 'projectId',
        'enabled': true,
        'name': 'First Test suite',
        'description': 'First testsuite description',
        'testcases': [],
        'created': '10.05.2017',
        'updated': '10.05.2017',
        'createdBy': 'Admin',
        'updatedBy': 'Admin'
      },
      {
        '_id': 2,
        'parentId': 1,
        'projectId': 'projectId2',
        'enabled': true,
        'name': 'First Test suite',
        'description': 'First testsuite description',
        'testcases': [],
        'created': '10.05.2017',
        'updated': '10.05.2017',
        'createdBy': 'Admin',
        'updatedBy': 'Admin'
      }
    ];

  }

}


