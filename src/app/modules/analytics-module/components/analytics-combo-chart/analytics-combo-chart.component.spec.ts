import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComboChartComponent } from './analytics-combo-chart.component';

describe('AnalyticsComboChartComponent', () => {
  let component: AnalyticsComboChartComponent;
  let fixture: ComponentFixture<AnalyticsComboChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsComboChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComboChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
