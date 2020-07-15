import { Component, OnInit, ViewChild } from '@angular/core';
import { DataConfig, DataConfigEx, Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { tap, take } from 'rxjs/operators';
import * as moment from 'moment';
import { CHART } from 'src/app/constants/chart.constant';
import { PieChartComponent } from 'src/app/widgets/shared/pie-chart/pie-chart.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  analysisView: 'machineView' | 'diagnosisView' = 'machineView';
  constructor() { }

  ngOnInit() { }

}
