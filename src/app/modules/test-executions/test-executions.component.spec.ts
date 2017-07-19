import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeService } from '../../services/theme/theme.service';
import { NotificationsService } from 'angular2-notifications';

import { TestExecutionsComponent } from './test-executions.component';

describe('TestExecutionsComponent', () => {
  let component: TestExecutionsComponent;
  let fixture: ComponentFixture<TestExecutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [TestExecutionsComponent],
      providers: [
        NotificationsService,
        ThemeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
