import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-testcase-list',
    templateUrl: 'testcase-list.component.html'
})
export class TestcaseListComponent implements OnInit {
    testcases: string[];

    constructor() {
        this.testcases = [
            'Check login registration',
            'Invalid registration case',
            'Add users'
            ];
    }

    ngOnInit() { }
}