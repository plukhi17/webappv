import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FftChartComponent} from './fft-chart.component';


@NgModule({
    declarations: [
        FftChartComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FftChartComponent
    ]
})
export class FftChartModule {
}
