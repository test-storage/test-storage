import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeviceModalComponent } from './create-device-modal.component';

describe('CreateDeviceModalComponent', () => {
  let component: CreateDeviceModalComponent;
  let fixture: ComponentFixture<CreateDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
