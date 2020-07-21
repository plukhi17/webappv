import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorMachinesAvailableComponent } from './monitor-machines-available.component';

describe('MonitorMachinesAvailableComponent', () => {
  let component: MonitorMachinesAvailableComponent;
  let fixture: ComponentFixture<MonitorMachinesAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorMachinesAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMachinesAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
