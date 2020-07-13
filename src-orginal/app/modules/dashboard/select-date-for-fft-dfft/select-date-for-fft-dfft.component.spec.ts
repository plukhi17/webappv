import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectDateForFftDfftComponent} from './select-date-for-fft-dfft.component';


describe('SelectDateForFftDfftComponent', () => {
    let component: SelectDateForFftDfftComponent;
    let fixture: ComponentFixture<SelectDateForFftDfftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectDateForFftDfftComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectDateForFftDfftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
