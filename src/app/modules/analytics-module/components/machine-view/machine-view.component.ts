import { Component, OnInit, ViewChild } from '@angular/core';
import { CHART } from 'src/app/constants/chart.constant';
import { PieChartComponent } from 'src/app/widgets/shared/pie-chart/pie-chart.component';
import { DataConfig, DataConfigEx, Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { tap, take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-machine-view',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./machine-view.component.scss']
})
export class MachineViewComponent implements OnInit {

  data: { y: number, label: string, [key: string]: any }[] = [];
  colors: string[] = CHART.MONITOR_PIE.colors;

  @ViewChild('pieChart') pieChart: PieChartComponent;
  public config: DataConfig;
  public configEx: DataConfigEx;  // Using this to send signal from Select-Date-FFT-DFFT card to FFT and DFFT cards. This is placed here because dashboard is the base container.

  public machines: Machine[];
  aggregatedData: any;
  comboChartData: any[] = [];

  constructor(private dataService: DataService) {
    this._fetchMachines();
  }

  ngOnInit() {
  }

  /**
   * Fetch all equipments.
   *
   * @private
   */
  private _fetchMachines(): void {
    this.dataService.fetchAllMachines().pipe(
      tap((machines: Machine[]) => this.machines = machines),
      take(1)
    ).subscribe();
  }

  onConfig(event: DataConfig): void {
    console.log('config', event);
    this.config = event;
    this.getHourlyAggregatedData();
    this.getDailyComboChartDataForAnalytics();
  }

  getHourlyAggregatedData(): void {
    this.dataService.getHourlyAggregatedData(this.config.normal, moment(this.config.normalDate).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.normalDate_To).format('YYYY-MM-DD HH:mm:ss'))
      .pipe(take(1)).subscribe((data) => {
        console.log('onConfig data', data);
        this.aggregatedData = data;
        this.updateChartData();
      });
  }

  getDailyComboChartDataForAnalytics(): void {
    this.dataService.getDailyComboChartDataForAnalytics(moment(this.config.normalDate).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.normalDate_To).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data) => {
      console.log('combo chart data daily', data);
      this.comboChartData = data;
    })
  }

  getHourlyComboChartDataForAnalytics(): void {
    this.dataService.getHourlyComboChartDataForAnalytics(moment(this.config.normalDate).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.normalDate_To).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data) => {
      console.log('combo chart data hourly', data);
      this.comboChartData = data;
    })
  }

  onTypeChange(event: string): void {
    switch (event) {
      case 'daily':
        this.getDailyComboChartDataForAnalytics();
        break;

      case 'hourly':
        this.getHourlyComboChartDataForAnalytics();
        break;

      default:
        this.getDailyComboChartDataForAnalytics();
        break;
    }
  }

  updateChartData(): void {
    if (this.aggregatedData) {
      this.data = [];
      this.data.push({ y: this.aggregatedData.running, label: 'Running', color: CHART.ANALYSIS_PIE.RUNNING.color });
      this.data.push({ y: this.aggregatedData.idle, label: 'Idle', color: CHART.ANALYSIS_PIE.IDLE.color });
      this.data.push({ y: this.aggregatedData.stopped, label: 'Stopped', color: CHART.ANALYSIS_PIE.STOPPED.color });
    }
    this.refreshChart();
  }

  refreshChart(): void {
    if (this.pieChart) {
      this.pieChart._renderChart();
    }
  }

}
