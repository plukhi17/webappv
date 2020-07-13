import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { PieChartComponent } from 'src/app/widgets/shared/pie-chart/pie-chart.component';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { CHART } from 'src/app/constants/chart.constant';
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
    this.updateChartData();
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.refreshChart();
  }

  updateChartData(): void {
    if (this.realTimeData) {
      const faults = Array.from(new Set(this.realTimeData.map((data) => data.status)));
      faults.sort();
      this.data = [];
      faults.forEach((status, index) => {
        this.data.push({ label: status, y: this.realTimeData.filter((data) => data.status === status).length, color: this.colors[index] })
      });
    }
    this.refreshChart();
  }

  refreshChart(): void {
    if (this.pieChart) {
      this.pieChart._renderChart();
    }
  }

}
