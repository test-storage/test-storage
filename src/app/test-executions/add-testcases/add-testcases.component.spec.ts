import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestcasesComponent } from './add-testcases.component';

xdescribe('AddTestcasesComponent', () => {
  let component: AddTestcasesComponent;
  let fixture: ComponentFixture<AddTestcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTestcasesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
