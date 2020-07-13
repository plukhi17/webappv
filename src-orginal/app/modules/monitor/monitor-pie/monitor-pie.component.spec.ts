import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPieComponent } from './monitor-pie.component';

describe('MonitorPieComponent', () => {
  let component: MonitorPieComponent;
  let fixture: ComponentFixture<MonitorPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
