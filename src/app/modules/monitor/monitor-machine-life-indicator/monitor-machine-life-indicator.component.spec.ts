import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorMachineLifeIndicatorComponent } from './monitor-machine-life-indicator.component';

describe('MonitorMachineLifeIndicatorComponent', () => {
  let component: MonitorMachineLifeIndicatorComponent;
  let fixture: ComponentFixture<MonitorMachineLifeIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorMachineLifeIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMachineLifeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
