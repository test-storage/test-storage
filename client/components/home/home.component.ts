import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'ts-home',
    templateUrl: 'home.component.html',
    styleUrls: []
})
export class HomeComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() { }
}