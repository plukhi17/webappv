import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsModuleRoutingModule } from './analytics-module-routing.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SelectMachineBlockComponent } from './components/select-machine-block/select-machine-block.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatButtonToggleModule, MatRadioModule, MatSliderModule, MatTableModule, MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { A11yModule } from '@angular/cdk/a11y';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { AnalyticsComboChartComponent } from './components/analytics-combo-chart/analytics-combo-chart.component';
import { MachineViewComponent } from './components/machine-view/machine-view.component';

@NgModule({
  declarations: [AnalyticsComponent, SelectMachineBlockComponent, AnalyticsComboChartComponent, MachineViewComponent],
  imports: [
    CommonModule,
    AnalyticsModuleRoutingModule,
    SharedModule,

    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,

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
    MatExpansionModule
  ]
})
export class AnalyticsModuleModule { }
