import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorAvailabilityStatusComponent } from './monitor-availability-status.component';

describe('MonitorAvailabilityStatusComponent', () => {
  let component: MonitorAvailabilityStatusComponent;
  let fixture: ComponentFixture<MonitorAvailabilityStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorAvailabilityStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorAvailabilityStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
