import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from "../../canvasjs.min.js";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() title: String;
  @Input() height: number = 100;
  @Input() width: number = 100;
  @Input() semi: boolean = false;
  @Input() animationEnabled: boolean = true;
  @Input('chartId') id: string = "doughnutChart";
  private _data: { y: number; label: string; }[] = [];
  @Input()
  public get data(): { y: number; label: string; }[] {
    return this._data;
  }
  public set data(value: { y: number; label: string; }[]) {
    this._data = value;
    if (this.data.length && document.getElementById(this.id)) {
      this._renderChart();
    }
  }

  @Input() subtitles: any[] = [];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    // this._renderChart();
  }
  _renderChart() {
    const element = document.getElementById(this.id);
    var chart = new CanvasJS.Chart(this.id, {
      animationEnabled: this.animationEnabled,
      height: this.height,
      width: this.width,
      theme: "light2",
      title: {
        text: this.title,
        maxWidth: 200
      },
      subtitles: [
        ...this.subtitles
      ],
      data: [{
        type: "doughnut",
        dataPoints: [
          ...this.data
        ]
      }]
    });
    if (this.semi) {
      this.convertToHalfDoughnut(chart);
    }
    chart.render();
  }

  convertToHalfDoughnut(chart: CanvasJS.Chart): void {
    var sum = 0;
    var dataPoints = chart.options.data[0].dataPoints;

    for (var i = 0; i < dataPoints.length; i++) {
      sum += dataPoints[i].y;
    }

    dataPoints.splice(0, 0, { y: sum, color: "transparent", toolTipContent: null, indexLabel: null, indexLabelFontSize: 0, exploded: true });
  }

}
