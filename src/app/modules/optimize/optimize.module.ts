import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptimizeRoutingModule } from './optimize-routing.module';
import { OptimizeComponent } from './components/optimize/optimize.component';
import { MachineBlockComponent } from './components/machine-block/machine-block.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatButtonToggleModule, MatRadioModule, MatSliderModule, MatTableModule, MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { A11yModule } from '@angular/cdk/a11y';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [OptimizeComponent, MachineBlockComponent],
  imports: [
    CommonModule,
    OptimizeRoutingModule,
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
export class OptimizeModule { }
