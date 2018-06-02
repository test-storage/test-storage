import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectModalComponent } from './delete-project-modal.component';

describe('DeleteProjectModalComponent', () => {
  let component: DeleteProjectModalComponent;
  let fixture: ComponentFixture<DeleteProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
