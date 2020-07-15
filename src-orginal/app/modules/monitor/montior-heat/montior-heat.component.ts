import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMapChartComponent } from 'src/app/widgets/shared/heat-map-chart/heat-map-chart.component';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-montior-heat',
  templateUrl: './montior-heat.component.html',
  styleUrls: ['./montior-heat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MontiorHeatComponent implements OnInit {

  @ViewChild('heatMapChart') heatMapChart: HeatMapChartComponent;

  data: { id: number, name: string, telemetry_time_ist_day: string, availability: number, riskscore: number }[] = [];
  filters: { from?: Date, to?: Date } = { from: new Date(2020, 0, 1), to: new Date(2020, 0, 7) };
  viewMode: 'riskscore' | 'availablity' = 'riskscore';
  filterType: 'daywise' | 'hourly' = 'daywise';

  chartBlockHeight = 500;
  singleBlockHeight = 50;
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
    this.dataService.getAllMachinesDaywiseAggregatedData(this.filters.from.toUTCString(), this.filters.to.toUTCString()).pipe(take(1)).subscribe((data) => {
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
    this.dataService.getAllMachinesHourlyAggregatedData(this.filters.from.toUTCString(), this.filters.to.toUTCString()).pipe(take(1)).subscribe((data) => {
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

  prepareChartData(data): void {
    this.xAxisCategories = Array.from(new Set(data.map(entry => entry.telemetry_time_ist_day)));
    this.yAxisCategories = Array.from(new Set(data.map(entry => entry.name)));
    this.chartSeries = [];
    let rows = 0;
    data.forEach((entry) => {
      if (this.yAxisCategories.indexOf(entry.name) > rows) {
        rows = this.yAxisCategories.indexOf(entry.name);
      }
      this.chartSeries.push([this.xAxisCategories.indexOf(entry.telemetry_time_ist_day), this.yAxisCategories.indexOf(entry.name), entry[this.viewMode]]);
    });
    this.chartBlockHeight = (rows + 1) * this.singleBlockHeight;
  }

  updateDataForChart(): void {
    this.heatMapChart.chartOptions.xAxis.categories = this.xAxisCategories.map(entry => new Date(entry).toDateString());
    this.heatMapChart.chartOptions.yAxis.categories = this.yAxisCategories;
    this.heatMapChart.chartOptions.title.text = 'Plant Status';
    const component = this;
    this.heatMapChart.chartOptions.tooltip = {
      formatter: function () {
        return '<b>' + this.series.yAxis.categories[this.point.y] +
          '</b> machine had <br><b>' +
          this.point.value +
          `</b> ${(component.viewMode === 'riskscore') ? 'risk score' : 'availability'} on <br><b>` +
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
