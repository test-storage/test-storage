import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../auth/index';
import { Testcase } from '../../models/testcase';
import { TestcaseService } from './testcase.service';

@Injectable()
export class MockTestcaseService extends TestcaseService {
    constructor() {
        super(null, null);
    }

    public getTestcases(): Observable<Testcase[]> {
        console.log('sending fake answers!');

        return Observable.of([

            {
                'parentId': null,
                'priority': 1,
                'order': 2,
                'prerequisites': 'Prerequisites 1',
                'title': 'Testcase 1',
                'description': 'Test case description',
                'steps': ['Check that', 'Check this'],
                'expected': ['Expected that', 'Expected this'],
                'tags': ['first tag', 'second tag'],
                'estimate': 10
            }
        ]
        );
    }
}