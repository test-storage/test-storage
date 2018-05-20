import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeviceModalComponent } from './delete-device-modal.component';

describe('DeleteDeviceModalComponent', () => {
  let component: DeleteDeviceModalComponent;
  let fixture: ComponentFixture<DeleteDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
