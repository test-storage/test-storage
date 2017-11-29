import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ProjectsLayoutComponent } from './projects-layout.component';
import { HeaderComponent } from '../layout/header/header.component';
import { NotificationsComponent } from '../layout/notifications/notifications.component';

import { ClickOutModule } from 'ngx-clickout';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthGuard, AuthenticationService, LocalStorageService } from '../../services/auth/index';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


describe('ProjectsLayoutComponent', () => {
  let component: ProjectsLayoutComponent;
  let fixture: ComponentFixture<ProjectsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SimpleNotificationsModule.forRoot(),
        ClickOutModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [
        ProjectsLayoutComponent,
        HeaderComponent,
        NotificationsComponent
      ],
      providers: [
        ThemeService,
        AuthGuard,
        AuthenticationService,
        LocalStorageService,
        JwtHelperService,
        {
          provide: JWT_OPTIONS,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
