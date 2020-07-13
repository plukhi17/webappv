import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as CanvasJS from "../../canvasjs.min.js";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @Input() title: String;
  @Input() height: number;
  @Input() width: number;
  @Input() semi: boolean = false;
  @Input() animationEnabled: boolean = true;
  private _data: { y: number; label: string; }[] = [];
  @Input()
  public get data(): { y: number; label: string; }[] {
    return this._data;
  }
  public set data(value: { y: number; label: string; }[]) {
    this._data = value;
    this._renderChart();
  }
  constructor() { }

  ngAfterViewInit() {
    this._renderChart();
  }
  _renderChart() {
    var chart = new CanvasJS.Chart("pieChart", {
      animationEnabled: this.animationEnabled,
      height: this.height,
      width: this.width,
      title: {
        text: this.title
      },
      data: [{
        type: "pie",
        // startAngle: 240,
        //yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          ...this.data
        ]
      }]
    });
    if (this.semi) {
      this.convertToHalfPie(chart);
    }
    chart.render();

  }

  convertToHalfPie(chart: CanvasJS.Chart): void {
    var sum = 0;
    var dataPoints = chart.options.data[0].dataPoints;

    for (var i = 0; i < dataPoints.length; i++) {
      sum += dataPoints[i].y;
    }

    dataPoints.splice(0, 0, { y: sum, color: "transparent", toolTipContent: null });
  }
}


