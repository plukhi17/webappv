import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnoseCardComponent} from './diagnose-card.component';


describe('DiagnoseCardComponent', () => {
    let component: DiagnoseCardComponent;
    let fixture: ComponentFixture<DiagnoseCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiagnoseCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiagnoseCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
