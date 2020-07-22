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
    this.filterDataByAvailability();
    // this.updateChartData();
  }

  showChart = false;
  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: 'bar'
    },
    title: {},
    xAxis: {
      categories: [],
      title: {
        text: null
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        stacking: 'normal'
      }
    },
    series: []
  };

  afterViewInitCalled = false;
  topMachines: RealTimeData[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.refreshChart();
    this.afterViewInitCalled = true;
    this.updateChart();
  }

  filterDataByAvailability(): void {
    const data = this.realTimeData.map((entry) => {
      entry['availability'] = +parseFloat((entry.running + entry.idle).toFixed(2));
      return entry;
    });
    data.sort((a, b) => b['availability'] - a['availability']);
    this.topMachines = data.slice(0, 5);
    console.log('data filtered', this.topMachines);
    this.updateChartData();
  }


  updateChartData(): void {
    if (this.topMachines && this.topMachines.length) {
      this.chartOptions.xAxis.categories = this.topMachines.map((m) => m.name);
      this.chartOptions.series = [];
      const data: { name: string, data: number[], color?: string }[] = [];
      data.push({
        name: 'Running',
        data: this.topMachines.map((m) => m.running),
        color: CHART.MONITOR_TOP_MACHINES.RUNNING.color
      });
      data.push({
        name: 'Idle',
        data: this.topMachines.map((m) => m.idle),
        color: CHART.MONITOR_TOP_MACHINES.IDLE.color
      });
      data.push({
        name: 'Stopped',
        data: this.topMachines.map((m) => m.stopped),
        color: CHART.MONITOR_TOP_MACHINES.STOPPED.color
      });
      this.chartOptions.series = data;
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
