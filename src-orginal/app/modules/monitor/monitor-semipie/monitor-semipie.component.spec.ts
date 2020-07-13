import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSemipieComponent } from './monitor-semipie.component';

describe('MonitorSemipieComponent', () => {
  let component: MonitorSemipieComponent;
  let fixture: ComponentFixture<MonitorSemipieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSemipieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSemipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
