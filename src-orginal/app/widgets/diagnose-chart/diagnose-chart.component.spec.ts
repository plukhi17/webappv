import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnoseChartComponent} from './diagnose-chart.component';


describe('DiagnoseChartComponent', () => {
    let component: DiagnoseChartComponent;
    let fixture: ComponentFixture<DiagnoseChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiagnoseChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiagnoseChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
