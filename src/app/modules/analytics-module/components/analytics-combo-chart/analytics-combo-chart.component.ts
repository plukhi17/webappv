import { Component, OnInit, ViewChild, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CHART } from 'src/app/constants/chart.constant';
import * as moment from 'moment';
// import * as CanvasJS from "../../canvasjs.min.js";

@Component({
  selector: 'app-analytics-combo-chart',
  templateUrl: './analytics-combo-chart.component.html',
  styleUrls: ['./analytics-combo-chart.component.scss']
})
export class AnalyticsComboChartComponent implements OnInit, AfterViewInit {

  private _data: any[] = [];
  @Input('data')
  public get data(): any[] {
    return this._data;
  }
  public set data(value: any[]) {
    this._data = value;
    this.updateChartData();
  }
  @Output('typeChange') typeChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('chart') chart: HighchartsChartComponent;
  showChart = false;

  lineChartOptions: { value: string, viewValue: string, color: any }[] = [
    {
      value: 'avg_riskscore', viewValue: 'Risk Score', color: ''
    },
    {
      value: 'starts', viewValue: 'Starts', color: ''
    },
    // {
    //   value: 'avg_riskscore', viewValue: 'Risk Score'
    // },
    // {
    //   value: 'avg_riskscore', viewValue: 'Risk Score'
    // },
  ]

  barChartOptions: { value: string, viewValue: string, color: any }[] = [
    {
      value: 'availability', viewValue: 'Availability', color: ''
    },
    {
      value: 'warnings', viewValue: 'Warnings', color: ''
    },
    {
      value: 'rated_current', viewValue: 'Rated Current', color: ''
    },
  ];

  filterTypeOptions: { value: string, viewValue: string }[] = [
    {
      value: 'daily', viewValue: 'Daily'
    },
    {
      value: 'hourly', viewValue: 'Hourly'
    }
  ]

  filters = {
    line: 'avg_riskscore',
    bar: 'warnings',
    filterType: 'daily'
  }

  highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    title: {
      text: 'Analytics'
    },
    xAxis: {
      categories: []
    },
    series: []
  };

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateChartData();
    }, 1000);
  }

  onTypeChange(): void {
    this.typeChange.emit(this.filters.filterType);
  }

  updateChartData(): void {
    if (this.data) {
      const categories = this.data.map((e) => {
        let value: string;
        if (this.filters.filterType === 'daily') {
          value = new Date(e.telemetry_day).toDateString();
        } else {
          // value = new Date(e.telemetry_hour).toString();
          value = moment(e.telemetry_hour).format('YYYY-MM-DD HH:mm:ss');
        }
        return value;
      });
      this.chartOptions.xAxis.categories = categories;
      console.log('categories', categories);
      this.chartOptions.series = [];
      if (this.filters.bar === 'availability') {
        const availabilitySeries: any = [
          {
            type: 'column',
            name: 'Running',
            data: this.data.map((e) => e.runningpercent),
            color: CHART.ANALYSIS_PIE.RUNNING.color
          },
          {
            type: 'column',
            name: 'Idle',
            data: this.data.map((e) => e.idlepercent),
            color: CHART.ANALYSIS_PIE.IDLE.color
          },
          {
            type: 'column',
            name: 'Stopped',
            data: this.data.map((e) => e.stoppedpercent),
            color: CHART.ANALYSIS_PIE.STOPPED.color
          }
        ];
        this.chartOptions.series.push(...availabilitySeries);
      } else {
        const barChartSeries: any = {
          type: 'column',
          name: this.barChartOptions.filter((e) => e.value == this.filters.bar)[0].viewValue,
          data: this.data.map((e) => e[this.filters.bar])
        }
        this.chartOptions.series.push(barChartSeries);
      }
      const lineChartSeries: any = {
        type: 'spline',
        name: this.lineChartOptions.filter((e) => e.value == this.filters.line)[0].viewValue,
        data: this.data.map((e) => e[this.filters.line]),
        // color: this.lineChartOptions.filter((e) => e.value == this.filters.line)[0].viewValue
      }
      this.chartOptions.series.push(lineChartSeries);
      console.log('chart series', this.chartOptions.series);
      this.data.forEach((entry) => {
      })
    }
    this.updateChart();
  }

  updateChart(): void {
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true;
    }, 50);
    // if (this.chart) {
    //   this.chart.options = this.chartOptions;
    //   this.chart.updateOrCreateChart();
    // }
  }

}
