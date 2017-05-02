import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testcase-tree',
  templateUrl: './testcase-tree.component.html',
  styleUrls: ['./testcase-tree.component.css']
})
export class TestcaseTreeComponent implements OnInit {

  nodes = [];

  constructor() {

    this.nodes = [
      {
        id: 1,
        name: 'Main mobile application',
        children: [
          { id: 2, name: 'Auth' },
          { id: 3, name: 'Users' }
        ]
      },
      {
        id: 4,
        name: 'Main portal',
        children: [
          { id: 5, name: 'Auth' },
          {
            id: 6,
            name: 'Users',
            children: [
              { id: 7, name: 'Create User' }
            ]
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
