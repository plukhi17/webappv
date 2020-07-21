import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorHealthStatusComponent } from './monitor-health-status.component';

describe('MonitorHealthStatusComponent', () => {
  let component: MonitorHealthStatusComponent;
  let fixture: ComponentFixture<MonitorHealthStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHealthStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorHealthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
