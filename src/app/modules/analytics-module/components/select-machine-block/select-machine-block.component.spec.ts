import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMachineBlockComponent } from './select-machine-block.component';

describe('SelectMachineBlockComponent', () => {
  let component: SelectMachineBlockComponent;
  let fixture: ComponentFixture<SelectMachineBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMachineBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMachineBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
