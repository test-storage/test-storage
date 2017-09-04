import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService, LocalStorageService } from '../../services/auth/index';

import { ModalModule } from 'ngx-bootstrap/modal';

import { UsersComponent } from './users.component';
import { UserService } from '../../services/user/user.service';

import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ],
      declarations: [UsersComponent],
      providers: [
        ThemeService,
        NotificationsService,
        AuthenticationService,
        LocalStorageService,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(component).toBeTruthy();
  }));
});
