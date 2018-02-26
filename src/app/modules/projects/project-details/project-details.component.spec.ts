import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ThemeService } from '../../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AuthenticationService, LocalStorageService } from '../../../services/auth/index';

import { ProjectService } from '../../../services/project/project.service';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [ProjectDetailsComponent],
      providers: [
        NotificationsService,
        ThemeService,
        TranslateService,
        ProjectService,
        AuthenticationService,
        LocalStorageService,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 123 })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /*
    it('should navigate', () => {
          let component = fixture.componentInstance;
          let navigateSpy = spyOn((<any>component).router, 'navigate');

          component.clickLink('home');
          expect(navigateSpy).toHaveBeenCalledWith(['/expectedUrl']);
      });
      */
});
