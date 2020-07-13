import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontiorHeatComponent } from './montior-heat.component';

describe('MontiorHeatComponent', () => {
  let component: MontiorHeatComponent;
  let fixture: ComponentFixture<MontiorHeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontiorHeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontiorHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
