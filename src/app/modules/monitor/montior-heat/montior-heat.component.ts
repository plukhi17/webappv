import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMapChartComponent } from 'src/app/widgets/shared/heat-map-chart/heat-map-chart.component';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

type AllMachinesData = { id: number, name: string, telemetry_time: string, running: number, avg_riskscore: number };
@Component({
  selector: 'app-montior-heat',
  templateUrl: './montior-heat.component.html',
  styleUrls: ['./montior-heat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MontiorHeatComponent implements OnInit {

  @ViewChild('heatMapChart') heatMapChart: HeatMapChartComponent;

  data: AllMachinesData[] = [];
  filters: { from?: Date, to?: Date } = { from: new Date(2020, 0, 1), to: new Date(2020, 0, 5) };
  viewModeOptions: { value: string, viewValue: string }[] = [
    { value: 'avg_riskscore', viewValue: 'Riskscore' },
    { value: 'running', viewValue: 'Availability' }
  ];
  viewMode: 'avg_riskscore' | 'running' = 'avg_riskscore';
  filterType: 'daywise' | 'hourly' = 'daywise';

  chartBlockHeight = 500;
  singleBlockHeight = 50;

  chartBlockWidth = 500;
  singleBlockWidth = 25;

  xAxisCategories = [];
  yAxisCategories = [];
  chartSeries: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.filterData();
  }

  filterData(): void {
    console.log('from: ', this.filters.from, ' to: ', this.filters.to);
    switch (this.filterType) {
      case 'daywise':
        this.getDaywiseAggregatedData();
        break;

      case 'hourly':
        this.getHourlyAggregatedData();
        break;

      default:
        break;
    }
  }

  getDaywiseAggregatedData(): void {
    this.dataService.getAllMachinesDaywiseAggregatedData(moment(this.filters.from).format('YYYY-MM-DD HH:mm:ss'), moment(this.filters.to).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data: AllMachinesData[]) => {
      console.log('getDaywiseAggregatedData', data);
      this.data = [];
      if (data && data.length) {
        this.prepareChartData(data);
        setTimeout(() => {
          this.data = data;
        }, 100);
        setTimeout(() => {
          this.updateDataForChart();
        }, 500);
      }
    });
  }

  calculateChartHeight(): void {

  }

  getHourlyAggregatedData(): void {
    this.dataService.getAllMachinesHourlyAggregatedData(moment(this.filters.from).format('YYYY-MM-DD HH:mm:ss'), moment(this.filters.to).format('YYYY-MM-DD HH:mm:ss')).pipe(take(1)).subscribe((data: AllMachinesData[]) => {
      console.log('getDaywiseAggregatedData', data);
      this.data = [];
      if (data && data.length) {
        this.prepareChartData(data);
        setTimeout(() => {
          this.data = data;
        }, 100);
        setTimeout(() => {
          this.updateDataForChart();
        }, 500);
      }
    });
  }

  prepareChartData(data: AllMachinesData[]): void {
    this.xAxisCategories = Array.from(new Set(data.map(entry => entry.telemetry_time)));
    this.yAxisCategories = Array.from(new Set(data.map(entry => entry.name)));
    this.chartSeries = [];
    let rows = 0;
    let cols = 0;
    data.forEach((entry) => {
      if (this.yAxisCategories.indexOf(entry.name) > rows) {
        rows = this.yAxisCategories.indexOf(entry.name);
      }
      if (this.xAxisCategories.indexOf(entry.telemetry_time) > cols) {
        cols = this.xAxisCategories.indexOf(entry.telemetry_time);
      }
      this.chartSeries.push([this.xAxisCategories.indexOf(entry.telemetry_time), this.yAxisCategories.indexOf(entry.name), entry[this.viewMode]]);
    });
    this.chartBlockHeight = ((rows + 1) * this.singleBlockHeight) + 200;
    this.chartBlockWidth = ((cols + 1) * this.singleBlockWidth) + 300;
  }

  updateDataForChart(): void {
    this.heatMapChart.chartOptions.xAxis.categories = this.xAxisCategories.map(entry => {
      if (this.filterType === 'daywise') {
        return moment(entry).format('MMM DD YYYY')
      } else {
        return moment(entry).format('MMM DD YYYY HH:mm:ss')
      }
    });
    this.heatMapChart.chartOptions.yAxis.categories = this.yAxisCategories;
    this.heatMapChart.chartOptions.title.text = 'Plant Status';
    const component = this;
    this.heatMapChart.chartOptions.tooltip = {
      formatter: function () {
        return '<b>' + this.series.yAxis.categories[this.point.y] +
          '</b> machine had <br><b>' +
          this.point.value +
          `</b> ${(component.viewMode === 'avg_riskscore') ? 'risk score' : 'availability'} on <br><b>` +
          this.series.xAxis.categories[this.point.x] + '</b>';
      }
    }
    this.heatMapChart.chartOptions.series[0].dataLabels.enabled = false;

    // this.heatMapChart.chartHeight = 2000;
    this.updateChart(this.chartSeries);
  }

  updateChart(data): void {
    this.heatMapChart.updateChartSeries(data);
  }

}
