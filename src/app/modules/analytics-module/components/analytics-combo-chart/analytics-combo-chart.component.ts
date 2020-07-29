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

  lineChartOptions: { value: string, viewValue: string, color: any, yAxis?: number }[] = [
    {
      value: 'avg_riskscore', viewValue: 'Risk Score', color: '', yAxis: 1
    },
    {
      value: 'starts', viewValue: 'No. of Starts', color: ''
    },
    {
      value: 'machine_life_value', viewValue: 'Machine Life Indicator', color: ''
    },
    {
      value: 'avg_i_rms', viewValue: 'Current', color: ''
    },
    {
      value: 'overloads', viewValue: 'Overloads', color: ''
    },
  ]

  barChartOptions: { value: string, viewValue: string, color: any, yAxis?: number }[] = [
    {
      value: 'availability', viewValue: 'Availability', color: '', yAxis: 1
    },
    {
      value: 'machine_status', viewValue: 'Machine Status', color: '', yAxis: 1
    },
    // {
    //   value: 'warnings', viewValue: 'Warnings', color: ''
    // },
    // {
    //   value: 'rated_current', viewValue: 'Rated Current', color: ''
    // },
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
    line: ['avg_riskscore', 'starts'],
    bar: 'availability',
    filterType: 'daily'
  }

  highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    title: {
      text: 'Reliability Analysis'
    },
    xAxis: {
      categories: []
    },
    yAxis: [
      {
        title: ''
      },
      {
        title: '',
        opposite: true,
        min: 0,
        max: 100
      }
    ],
    series: [],
    chart: {
      zoomType: 'xy'
    }
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
          // value = new Date(e.telemetry_day).toDateString();
          value = (e.telemetry_day) ? e.telemetry_day.replace('.000Z', '') : e.telemetry_day;
        } else {
          // value = new Date(e.telemetry_hour).toString();
          // value = moment(e.telemetry_hour).format('YYYY-MM-DD HH:mm:ss');
          value = (e.telemetry_hour) ? e.telemetry_hour.replace('.000Z', '') : e.telemetry_hour;
        }
        return value;
      });
      this.chartOptions.xAxis.categories = categories;
      console.log('categories', categories);
      this.chartOptions.series = [];
      if (this.filters.bar === 'availability') {
        const selectedOption = this.barChartOptions.filter((e) => e.value == this.filters.bar)[0];
        const availabilitySeries: any = [
          {
            type: 'column',
            name: 'Running',
            data: this.data.map((e) => e.runningpercent),
            color: CHART.AVAILABILITY_STATUS.RUNNING.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          },
          {
            type: 'column',
            name: 'Idle',
            data: this.data.map((e) => e.idlepercent),
            color: CHART.AVAILABILITY_STATUS.IDLE.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          },
          {
            type: 'column',
            name: 'Stopped',
            data: this.data.map((e) => e.stoppedpercent),
            color: CHART.AVAILABILITY_STATUS.STOPPED.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          }
        ];
        this.chartOptions.series.push(...availabilitySeries);
      } else if (this.filters.bar === 'machine_status') {
        const selectedOption = this.barChartOptions.filter((e) => e.value == this.filters.bar)[0];
        const machineStatusSeries: any = [
          {
            type: 'column',
            name: 'Critical',
            data: this.data.map((e) => e.criticalpercent),
            color: CHART.HEALTH_STATUS.CRITICAL.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          },
          {
            type: 'column',
            name: 'Warning',
            data: this.data.map((e) => e.warningpercent),
            color: CHART.HEALTH_STATUS.WARNING.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          },
          {
            type: 'column',
            name: 'Normal',
            data: this.data.map((e) => e.normalpercent),
            color: CHART.HEALTH_STATUS.NORMAL.color,
            yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          }
        ];
        this.chartOptions.series.push(...machineStatusSeries);
      } else {
        const barChartSeries: any = {
          type: 'column',
          name: this.barChartOptions.filter((e) => e.value == this.filters.bar)[0].viewValue,
          data: this.data.map((e) => e[this.filters.bar])
        }
        this.chartOptions.series.push(barChartSeries);
      }
      this.filters.line.forEach((entry) => {
        const selectedOption = this.lineChartOptions.filter((e) => e.value == entry)[0];
        const lineChartSeries: any = {
          type: 'spline',
          name: selectedOption.viewValue,
          data: this.data.map((e) => e[entry]),
          yAxis: selectedOption.yAxis ? selectedOption.yAxis : 0
          // color: this.lineChartOptions.filter((e) => e.value == this.filters.line)[0].viewValue
        }
        this.chartOptions.series.push(lineChartSeries);
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
