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

  @ViewChild('pieChart') pieChart: PieChartComponent;
  public config: { normal: Machine, fromToDate: moment.Moment[] };

  public machines: Machine[];
  aggregatedData: any;
  comboChartData: any[];

  showPieChart = true;
  loading = false;

  showChart = false;
  highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
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
        size: '120%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };

  afterViewInitCalled = false;

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
        this.loading = false;
        this.updateChartData2();
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

  updateChartData(): void {
    if (this.aggregatedData && (this.aggregatedData.running || this.aggregatedData.idle || this.aggregatedData.stopped)) {
      this.showPieChart = true;
      this.data = [];
      this.data.push({ y: this.aggregatedData.running || 0, label: 'Running', color: CHART.ANALYSIS_PIE.RUNNING.color });
      this.data.push({ y: this.aggregatedData.idle || 0, label: 'Idle', color: CHART.ANALYSIS_PIE.IDLE.color });
      this.data.push({ y: this.aggregatedData.stopped || 0, label: 'Stopped', color: CHART.ANALYSIS_PIE.STOPPED.color });
    } else {
      this.showPieChart = false;
    }
    this.refreshChart();
  }

  refreshChart(): void {
    if (this.pieChart) {
      this.pieChart._renderChart();
    }
  }

  updateChartData2(): void {
    if (this.aggregatedData && (this.aggregatedData.running || this.aggregatedData.idle || this.aggregatedData.stopped)) {
      this.chartOptions.series = [];
      const data = [];
      data.push({ y: this.aggregatedData.running || 0, name: 'Running', color: CHART.ANALYSIS_PIE.RUNNING.color });
      data.push({ y: this.aggregatedData.idle || 0, name: 'Idle', color: CHART.ANALYSIS_PIE.IDLE.color });
      data.push({ y: this.aggregatedData.stopped || 0, name: 'Stopped', color: CHART.ANALYSIS_PIE.STOPPED.color });
      const series = {
        type: 'pie',
        name: `Pie Chart`,
        data: data
      }
      this.chartOptions.series.push(series);
      this.chartOptions.title = '';
    }
    this.updateChart();
  }

  updateChart(): void {
    this.showChart = false;
    if (this.afterViewInitCalled) {
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    }
  }

}
