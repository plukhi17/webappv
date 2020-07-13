import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiagnoseChartComponent} from './diagnose-chart.component';


@NgModule({
    declarations: [
        DiagnoseChartComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DiagnoseChartComponent
    ]
})
export class DiagnoseChartModule {
}
