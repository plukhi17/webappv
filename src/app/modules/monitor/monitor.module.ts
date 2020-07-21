import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorRealComponent } from './monitor-real.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorPieComponent } from './monitor-pie/monitor-pie.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatButtonToggleModule, MatRadioModule, MatSliderModule, MatTableModule, MatPaginatorModule, MatExpansionModule, MatSortModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { A11yModule } from '@angular/cdk/a11y';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import { MonitorSemipieComponent } from './monitor-semipie/monitor-semipie.component';
import { MonitorBarComponent } from './monitor-bar/monitor-bar.component';
import { MonitorTableComponent } from './monitor-table/monitor-table.component';
import { MontiorHeatComponent } from './montior-heat/montior-heat.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { MonitorHealthStatusComponent } from './monitor-health-status/monitor-health-status.component';
import { MonitorAvailabilityStatusComponent } from './monitor-availability-status/monitor-availability-status.component';
import { MonitorCardsComponent } from './monitor-cards/monitor-cards.component';
import { MonitorMachinesAvailableComponent } from './monitor-machines-available/monitor-machines-available.component';
import { MonitorMachineLifeIndicatorComponent } from './monitor-machine-life-indicator/monitor-machine-life-indicator.component';

@NgModule({
  declarations: [
    MonitorRealComponent,
    MonitorPieComponent,
    MonitorSemipieComponent,
    MonitorBarComponent,
    MonitorTableComponent,
    MontiorHeatComponent,
    MonitorHealthStatusComponent,
    MonitorAvailabilityStatusComponent,
    MonitorCardsComponent,
    MonitorMachinesAvailableComponent,
    MonitorMachineLifeIndicatorComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    SharedModule,
    FormsModule,
    HighchartsChartModule,


    /* Material modules */
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    A11yModule,
    MatButtonToggleModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule,
    MatRadioModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule

  ]
})
export class MonitorModule { }
