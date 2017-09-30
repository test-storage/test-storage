import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';

import { AuthenticationService, LocalStorageService } from '../../services/auth/index';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../services/user/user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [
        ThemeService,
        TranslateService,
        TranslateModule,
        AuthenticationService,
        LocalStorageService,
        UserService
      ],
      declarations: [ProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([UserService], (service: UserService) => {
    expect(component).toBeTruthy();
  }));
});
