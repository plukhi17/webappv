import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineBlockComponent } from './machine-block.component';

describe('MachineBlockComponent', () => {
  let component: MachineBlockComponent;
  let fixture: ComponentFixture<MachineBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
