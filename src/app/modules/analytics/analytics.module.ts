import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { MatProgressBarModule } from '@angular/material';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,

    /* Material Modules */
    MatProgressBarModule
  ]
})
export class AnalyticsModule { }
