import { Component, OnInit, Input } from '@angular/core';
import { CHART } from 'src/app/constants/chart.constant';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-monitor-health-status',
  templateUrl: './monitor-health-status.component.html',
  styleUrls: ['./monitor-health-status.component.scss']
})
export class MonitorHealthStatusComponent implements OnInit {

  pieData: boolean = false;
  data: { y: number, label: string, [key: string]: any }[] = [];
  colors: string[] = CHART.MONITOR_PIE.colors;

  private _realTimeData: RealTimeData[];
  @Input('data')
  public get realTimeData(): RealTimeData[] {
    return this._realTimeData;
  }
  public set realTimeData(value: RealTimeData[]) {
    this._realTimeData = value;
    this.updateChartData();
  }

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
          distance: 5,
          style: {
            fontSize: '12px',
            textOverflow: 'none'
          }
        },
        // minSize: '300px',
        showInLegend: false,
        // startAngle: -90,
        // endAngle: 90,
        // center: ['50%', '90%'],
        // size: '180%'
        center: ['50%', '50%'],
        size: '100%',
        innerSize: '50%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };

  afterViewInitCalled = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.refreshChart();
    this.afterViewInitCalled = true;
    this.updateChart();
  }


  updateChartData(): void {
    if (this.realTimeData && this.realTimeData.length) {
      this.chartOptions.series = [];
      const faults = Array.from(new Set(this.realTimeData.map((data) => data.avg_health_status)));
      faults.sort();
      const data = [];
      // faults.forEach((status, index) => {
      //   data.push({ name: status, y: this.realTimeData.filter((data) => data.avg_health_status === status).length, color: this.colors[index] })
      // });
      data.push({ name: 'Normal', y: this.realTimeData.filter((data) => data.avg_health_status === 'Normal').length, color: CHART.HEALTH_STATUS.NORMAL.color });
      data.push({ name: 'Warning', y: this.realTimeData.filter((data) => data.avg_health_status === 'Warning').length, color: CHART.HEALTH_STATUS.WARNING.color });
      data.push({ name: 'Critical', y: this.realTimeData.filter((data) => data.avg_health_status === 'Critical').length, color: CHART.HEALTH_STATUS.CRITICAL.color });
      // data.push({ name: 'Unknown', y: this.realTimeData.filter((data) => data.avg_health_status === 'Unknown').length, color: CHART.HEALTH_STATUS.UNKNOWN.color });
      const series = {
        type: 'pie',
        name: `Monitor Status`,
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
