import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BarChartComponent } from 'src/app/widgets/shared/bar-chart/bar-chart.component';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';

@Component({
  selector: 'app-monitor-bar',
  templateUrl: './monitor-bar.component.html',
  styleUrls: ['./monitor-bar.component.scss']
})
export class MonitorBarComponent implements OnInit {

  data: { y: number, label: string, [key: string]: any }[] = [];
  @ViewChild('barChart') barChart: BarChartComponent;
  colors: string[] = ["#4F81BC", "#e0d360", "#BF4E85"];

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
      const faults = Array.from(new Set(this.realTimeData.map((data) => data.fault)));
      faults.sort();
      this.data = [];
      faults.forEach((fault, index) => {
        this.data.push({ label: fault, y: this.realTimeData.filter((data) => data.fault === fault).length, color: this.colors[(index % faults.length)] })
      });

      /* other approach
      this.data = [];
      const map = new Map<string, number>();
      this.realTimeData.forEach((data) => {
        if (map.get(data.fault)) {
          map.set(data.fault, map.get(data.fault) + 1);
        } else {
          map.set(data.fault, 1);
        }
      });
      map.forEach((value, key) => {
        this.data.push({ y: value, label: key });
      });
      */
    }
    this.refreshChart();
  }

  refreshChart(): void {
    if (this.barChart) {
      this.barChart._renderChart();
    }
  }

}
