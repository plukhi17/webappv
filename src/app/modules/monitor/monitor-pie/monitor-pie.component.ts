import { Component, OnInit, ViewChild, AfterViewInit, Input, HostListener } from '@angular/core';
import { PieChartComponent } from 'src/app/widgets/shared/pie-chart/pie-chart.component';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { CHART } from 'src/app/constants/chart.constant';
import * as Highcharts from 'highcharts';
// import { MonitorPieChartComponent} from '../../../widgets/monitor-pie-chart/monitor-pie-chart.component'
@Component({
  selector: 'app-monitor-pie',
  templateUrl: './monitor-pie.component.html',
  styleUrls: ['./monitor-pie.component.scss']
})
export class MonitorPieComponent implements OnInit, AfterViewInit {
  pieData: boolean = false;
  data: { y: number, label: string, [key: string]: any }[] = [];
  colors: string[] = CHART.MONITOR_PIE.colors;

  @ViewChild('pieChart') pieChart: PieChartComponent;

  private _realTimeData: RealTimeData[];
  @Input('data')
  public get realTimeData(): RealTimeData[] {
    return this._realTimeData;
  }
  public set realTimeData(value: RealTimeData[]) {
    this._realTimeData = value;
    // this.updateChartData();
    this.updateChartData2();
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

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // this.refreshChart();
    this.afterViewInitCalled = true;
    this.updateChart();
  }

  updateChartData(): void {
    if (this.realTimeData) {
      const faults = Array.from(new Set(this.realTimeData.map((data) => data.health_status)));
      faults.sort();
      this.data = [];
      faults.forEach((status, index) => {
        this.data.push({ label: status, y: this.realTimeData.filter((data) => data.health_status === status).length, color: this.colors[index] })
      });
    }
    this.refreshChart();
  }

  refreshChart(): void {
    if (this.pieChart) {
      this.pieChart._renderChart();
    }
  }

  updateChartData2(): void {
    if (this.realTimeData && this.realTimeData.length) {
      this.chartOptions.series = [];
      const faults = Array.from(new Set(this.realTimeData.map((data) => data.health_status)));
      faults.sort();
      const data = [];
      faults.forEach((status, index) => {
        data.push({ name: status, y: this.realTimeData.filter((data) => data.health_status === status).length, color: this.colors[index] })
      });
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
