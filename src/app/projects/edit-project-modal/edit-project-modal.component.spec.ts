import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectModalComponent } from './edit-project-modal.component';

describe('EditProjectModalComponent', () => {
  let component: EditProjectModalComponent;
  let fixture: ComponentFixture<EditProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
