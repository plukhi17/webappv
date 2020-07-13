import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap.js';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-heat-map-chart',
  templateUrl: './heat-map-chart.component.html',
  styleUrls: ['./heat-map-chart.component.scss']
})
export class HeatMapChartComponent implements OnInit {

  @ViewChild('chart') chart: HighchartsChartComponent;
  highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80
    },
    title: {
      // text: 'Sales per employee per weekday'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      categories: [],
      title: null
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: [],

      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]

  };

  chartHeight: number = 480;

  constructor() {

    Heatmap(Highcharts);
  }

  ngOnInit() {
  }

  updateChartSeries(chartData: any[]): void {
    this.chartOptions.series[0].data = chartData;

    this.chart.updateOrCreateChart();
  }

}
