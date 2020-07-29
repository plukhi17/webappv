import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { take, tap } from 'rxjs/operators';
import { CHART } from 'src/app/constants/chart.constant';
import { Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { PieChartComponent } from 'src/app/widgets/shared/pie-chart/pie-chart.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-machine-view',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./machine-view.component.scss']
})
export class MachineViewComponent implements OnInit, AfterViewInit {

  data: { y: number, label: string, [key: string]: any }[] = [];
  colors: string[] = CHART.MONITOR_PIE.colors;

  public config: { normal: Machine, fromToDate: moment.Moment[] };

  public machines: Machine[];
  aggregatedData: any;
  comboChartData: any[];

  showAvailabilityChartBlock = true;
  loading = false;

  showAvailabilityChart = false;
  highcharts = Highcharts;
  availabilityChartOptions: Highcharts.Options | any = {
    title: {
      text: ''
    },
    plotOptions: {
      series: {
        animation: false
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.y}</b>',
          distance: 10,
          style: {
            fontSize: '12px'
          }
        },
        minSize: '400px',
        showInLegend: false,
        size: '120%',
        // startAngle: -90,
        // endAngle: 90,
        center: ['50%', '50%'],
        innerSize: '50%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };


  showHealthChartBlock = true;
  showHealthChart = false;
  healthChartOptions: Highcharts.Options | any = {
    title: {
      text: ''
    },
    plotOptions: {
      series: {
        animation: false
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.y}</b>',
          distance: 10,
          style: {
            fontSize: '12px'
          }
        },
        minSize: '400px',
        showInLegend: false,
        size: '120%',
        // startAngle: -90,
        // endAngle: 90,
        center: ['50%', '50%'],
        innerSize: '50%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };

  afterViewInitCalled = false;

  currentColor = 'black';
  overloadsColor = CHART.MONITOR_CARDS.OVERLOADS.DEFAULT;
  riskscoreColor = CHART.RISKSCORE.NORMAL.color;

  constructor(private dataService: DataService) {
    this._fetchMachines();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.afterViewInitCalled = true;
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

  onConfig(event: any): void {
    console.log('config', event);
    this.aggregatedData = null;
    this.comboChartData = null;
    if (event) {
      this.config = event;
      this.getHourlyAggregatedData();
      this.getDaywiseAggregatedMetrics();
    }
  }

  getHourlyAggregatedData(): void {
    this.loading = true;
    this.dataService.getHourlyAggregatedData(this.config.normal, moment(this.config.fromToDate[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.fromToDate[1]).format('YYYY-MM-DD HH:mm:ss'))
      .pipe(take(1)).subscribe((data) => {
        console.log('onConfig data', data);
        if (data) {
          this.aggregatedData = data;
        } else {
          this.aggregatedData = {};
        }
        if (this.aggregatedData) {
          if (this.aggregatedData.overloads <= 80) {
            this.overloadsColor = CHART.MONITOR_CARDS.OVERLOADS.UPTO_80;
          } else {
            this.overloadsColor = CHART.MONITOR_CARDS.OVERLOADS.DEFAULT;
          }
          if (this.aggregatedData.avg_riskscore >= 70) {
            this.riskscoreColor = CHART.RISKSCORE.CRITICAL.color;
          } else if (this.aggregatedData.avg_riskscore >= 50) {
            this.riskscoreColor = CHART.RISKSCORE.WARNING.color;
          } else if (this.aggregatedData.avg_riskscore >= 30) {
            this.riskscoreColor = CHART.RISKSCORE.NORMAL.color;
          } else {
            this.riskscoreColor = 'black';
          }
        }
        this.loading = false;
        this.updateAvailabilityChartData();
        this.updateHealthChartData();
      });
  }

  getDaywiseAggregatedMetrics(): void {
    this.dataService.getDaywiseAggregatedMetrics(this.config.normal, moment(this.config.fromToDate[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.fromToDate[1]).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data) => {
      console.log('combo chart data daily', data);
      this.comboChartData = data;
    })
  }

  getHourlyAggregatedMetrics(): void {
    this.dataService.getHourlyAggregatedMetrics(this.config.normal, moment(this.config.fromToDate[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.config.fromToDate[1]).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data) => {
      console.log('combo chart data hourly', data);
      this.comboChartData = data;
    })
  }

  onTypeChange(event: string): void {
    switch (event) {
      case 'daily':
        this.getDaywiseAggregatedMetrics();
        break;

      case 'hourly':
        this.getHourlyAggregatedMetrics();
        break;

      default:
        this.getDaywiseAggregatedMetrics();
        break;
    }
  }

  updateAvailabilityChartData(): void {
    if (this.aggregatedData && (this.aggregatedData.running || this.aggregatedData.idle || this.aggregatedData.stopped)) {
      this.showAvailabilityChartBlock = true;
      this.availabilityChartOptions.series = [];
      const data = [];
      data.push({ y: this.aggregatedData.running || 0, name: 'Running', color: CHART.AVAILABILITY_STATUS.RUNNING.color });
      data.push({ y: this.aggregatedData.idle || 0, name: 'Idle', color: CHART.AVAILABILITY_STATUS.IDLE.color });
      data.push({ y: this.aggregatedData.stopped || 0, name: 'Stopped', color: CHART.AVAILABILITY_STATUS.STOPPED.color });
      const series = {
        type: 'pie',
        name: `Availability Status`,
        data: data
      }
      this.availabilityChartOptions.series.push(series);
      this.availabilityChartOptions.title = '';
    } else {
      this.showAvailabilityChartBlock = false;
    }
    this.updateAvailabilityChart();
  }

  updateHealthChartData(): void {
    if (this.aggregatedData && (this.aggregatedData.critical_percentage || this.aggregatedData.warning_percentage || this.aggregatedData.normal_percentage)) {
      this.showHealthChartBlock = true;
      this.healthChartOptions.series = [];
      const data = [];
      data.push({ y: this.aggregatedData.critical_percentage || 0, name: 'Critical', color: CHART.HEALTH_STATUS.CRITICAL.color });
      data.push({ y: this.aggregatedData.warning_percentage || 0, name: 'Warning', color: CHART.HEALTH_STATUS.WARNING.color });
      data.push({ y: this.aggregatedData.normal_percentage || 0, name: 'Normal', color: CHART.HEALTH_STATUS.NORMAL.color });
      const series = {
        type: 'pie',
        name: `Health Status`,
        data: data
      }
      this.healthChartOptions.series.push(series);
      this.healthChartOptions.title = '';
    } else {
      this.showHealthChartBlock = false;
    }
    this.updateHealthChart();
  }

  updateAvailabilityChart(): void {
    this.showAvailabilityChart = false;
    if (this.afterViewInitCalled) {
      setTimeout(() => {
        this.showAvailabilityChart = true;
      }, 50);
    }
  }

  updateHealthChart(): void {
    this.showHealthChart = false;
    if (this.afterViewInitCalled) {
      setTimeout(() => {
        this.showHealthChart = true;
      }, 50);
    }
  }

}
