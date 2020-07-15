import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';
import { DoughnutChartComponent } from 'src/app/widgets/shared/doughnut-chart/doughnut-chart.component';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { CHART } from 'src/app/constants/chart.constant';

@Component({
  selector: 'app-monitor-semipie',
  templateUrl: './monitor-semipie.component.html',
  styleUrls: ['./monitor-semipie.component.scss']
})
export class MonitorSemipieComponent implements OnInit {

  data: { y: number, label: string }[] = [];
  @ViewChildren('doughnutChart') charts: QueryList<DoughnutChartComponent>;

  private _realTimeData: RealTimeData[];
  @Input('data')
  public get realTimeData(): RealTimeData[] {
    return this._realTimeData;
  }
  public set realTimeData(value: RealTimeData[]) {
    this._realTimeData = value;
    this.updateChartData();
  }

  runningMachines: number = 0;
  idleMachines: number = 0;
  stoppedMachines: number = 0;

  runningCountChart = {
    data: [],
    subtitles: []
  }

  idleCountChart = {
    data: [],
    subtitles: []
  }

  stoppedCountChart = {
    data: [],
    subtitles: []
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  updateChartData(): void {
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
    this.runningCountChart.data = [{ y: this.runningMachines, color: CHART.MONITOR_SEMIPIE.RUNNING.color }]; // "#C0504E"
    this.runningCountChart.subtitles = [{ text: this.runningMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    this.idleCountChart.data = [{ y: this.idleMachines, color: CHART.MONITOR_SEMIPIE.IDLE.color }];
    this.idleCountChart.subtitles = [{ text: this.idleMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    this.stoppedCountChart.data = [{ y: this.stoppedMachines, color: CHART.MONITOR_SEMIPIE.STOPPED.color }];
    this.stoppedCountChart.subtitles = [{ text: this.stoppedMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    setTimeout(() => {
      this.refreshChart();
    }, 200);
  }

  refreshChart(): void {
    if (this.charts) {
      this.charts.forEach((chart) => {
        chart._renderChart();
      })
    }
  }

}
