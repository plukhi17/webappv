import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as CanvasJS from "../../canvasjs.min.js";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @Input() title: String="Pie Chart";
  @Input() height: number;
  @Input() width: number;
  constructor() { }

  ngAfterViewInit() {
    this._renderChart();
  }
  _renderChart() {
    var chart = new CanvasJS.Chart("pieChart", {
      animationEnabled: true,
      height: this.height,
      width:this.width,
      title: {
        text: this.title
      },
      data: [{
        type: "pie",
        startAngle: 240,
        //yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: 79.45, label: "Google"},
          {y: 7.31, label: "Bing"},
          {y: 7.06, label: "Baidu"},
          {y: 1.26, label: "Others"}
        ]
      }]
    });
    chart.render();
    
    }
  }


