import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from "../../canvasjs.min.js";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() title: String;
  @Input() height: number = 100;
  @Input() width: number = 100;
  @Input() animationEnabled: boolean = true;
  @Input('chartId') id: string = "doughnutChart";
  private _data: { y: number; label: string; }[] = [];
  @Input()
  public get data(): { y: number; label: string; }[] {
    return this._data;
  }
  public set data(value: { y: number; label: string; }[]) {
    this._data = value;
    if (document.getElementById(this.id)) {
      this._renderChart();
    }
  }
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this._renderChart();
  }
  _renderChart() {
    const element = document.getElementById(this.id);
    var chart = new CanvasJS.Chart(this.id, {
      animationEnabled: this.animationEnabled,
      height: this.height,
      width: this.width,
      title: {
        text: this.title
      },
      data: [{
        type: "bar",
        // startAngle: 240,
        //yValueFormatString: "##0.00\"%\"",
        // indexLabel: "{label} {y}",
        // color: ['#00fff0', '#605040'],
        dataPoints: [
          ...this.data
        ]
      }]
    });
    chart.render();

  }

}
