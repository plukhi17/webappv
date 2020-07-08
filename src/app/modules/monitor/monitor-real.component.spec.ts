import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorRealComponent } from './monitor-real.component';

describe('MonitorRealComponent', () => {
  let component: MonitorRealComponent;
  let fixture: ComponentFixture<MonitorRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
