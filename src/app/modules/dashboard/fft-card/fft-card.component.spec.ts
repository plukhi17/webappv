import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FftCardComponent} from './fft-card.component';


describe('FftCardComponent', () => {
    let component: FftCardComponent;
    let fixture: ComponentFixture<FftCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FftCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FftCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
