import { Component, OnInit } from '@angular/core';
import { MonitorPieChartComponent} from '../../../widgets/monitor-pie-chart/monitor-pie-chart.component'
@Component({
  selector: 'app-monitor-pie',
  templateUrl: './monitor-pie.component.html',
  styleUrls: ['./monitor-pie.component.scss']
})
export class MonitorPieComponent implements OnInit {
  private pieData:boolean= false;
 
  constructor() { }

  ngOnInit() {
  }

}
