import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../../services/theme/theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateProjectComponent } from './create-project.component';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [CreateProjectComponent],
      providers: [ThemeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
