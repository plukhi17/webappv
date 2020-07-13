import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HeatMapChartComponent } from './heat-map-chart/heat-map-chart.component';

@NgModule({
  declarations: [
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    HeatMapChartComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HighchartsChartModule
  ],
  exports: [
    // components
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    HeatMapChartComponent,
    HighchartsChartModule,

    // modules
    FlexLayoutModule
  ]
})
export class SharedModule { }
