import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-user-list',
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
    users: Object[];

    constructor() { 
        this.users = [ 
            { 
                "id": 1,
                "lastName": "Polyakov",
                "firstName": "Anton",
                "email": "polyakov@teststorage.local",
                "activated": true
            },
            { 
                "id": 2,
                "lastName": "Abramtsev",
                "firstName": "Sergey",
                "email": "abramtsev@teststorage.local",
                "activated": true
            }
            ]
    }

    ngOnInit() { }
}