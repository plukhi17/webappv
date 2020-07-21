import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CHART } from 'src/app/constants/chart.constant';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';

@Component({
  selector: 'app-monitor-machines-available',
  templateUrl: './monitor-machines-available.component.html',
  styleUrls: ['./monitor-machines-available.component.scss']
})
export class MonitorMachinesAvailableComponent implements OnInit {

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
          distance: 10,
          style: {
            fontSize: '12px'
          }
        },
        minSize: '300px',
        showInLegend: false,
        // startAngle: -90,
        // endAngle: 90,
        // center: ['50%', '90%'],
        // size: '180%'
        center: ['50%', '50%'],
        // size: '45%',
        innerSize: '50%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };

  afterViewInitCalled = false;
  runningMachines: number = 0;
  idleMachines: number = 0;
  stoppedMachines: number = 0;

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
      if (this.realTimeData) {
        this.runningMachines = 0;
        this.idleMachines = 0;
        this.stoppedMachines = 0;
        this.realTimeData.forEach((data) => {
          if (data.availabilty_status === 'Running') {
            this.runningMachines++;
          }
          if (data.availabilty_status === 'Idle') {
            this.idleMachines++;
          }
          if (data.availabilty_status === 'Stopped') {
            this.stoppedMachines++;
          }
        })
      }
      this.chartOptions.series = [];
      const data = [];
      data.push({ name: 'Running', y: this.runningMachines, color: CHART.MONITOR_SEMIPIE.RUNNING.color });
      data.push({ name: 'Idle', y: this.idleMachines, color: CHART.MONITOR_SEMIPIE.IDLE.color });
      data.push({ name: 'Stopped', y: this.stoppedMachines, color: CHART.MONITOR_SEMIPIE.STOPPED.color });
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
