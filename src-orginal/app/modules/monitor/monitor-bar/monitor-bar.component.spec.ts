import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorBarComponent } from './monitor-bar.component';

describe('MonitorBarComponent', () => {
  let component: MonitorBarComponent;
  let fixture: ComponentFixture<MonitorBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
