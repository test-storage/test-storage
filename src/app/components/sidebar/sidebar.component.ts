import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input()
    sidebarCollapsed: boolean = true;
    constructor() { }

    ngOnInit() { }
}