import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { take, tap } from 'rxjs/operators';
import { Machine } from 'src/app/interfaces';
import * as Highcharts from 'highcharts';
import { CHART } from 'src/app/constants/chart.constant';

@Component({
  selector: 'app-monitor-machine-life-indicator',
  templateUrl: './monitor-machine-life-indicator.component.html',
  styleUrls: ['./monitor-machine-life-indicator.component.scss']
})
export class MonitorMachineLifeIndicatorComponent implements OnInit {

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "spline"
    },
    title: {},
    xAxis: {
      categories: []
    },
    yAxis: {},
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: []
  };

  machines: Machine[] = [];
  selectedMachine: Machine | any = 'pl';
  plantLifeValues: { telemetry_hour: string, plant_life_value: number }[] = [];
  machineLifeValues: { equipment_id: number, machine_life_value: number, telemetry_hour: string }[] = [];
  showChart = false;
  noData = false;
  loading = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this._fetchMachines();
    this.getData();
  }

  /**
   * Fetch all equipments.
   *
   * @private
   */
  private _fetchMachines(): void {
    this.dataService.fetchAllMachines().pipe(
      tap((machines: Machine[]) => this.machines = machines),
      take(1)
    ).subscribe();
  }

  getData(): void {
    if (this.selectedMachine && this.selectedMachine !== 'pl') {
      this.getHourlyMachineLifeValue();
    } else {
      this.getHourlyPlantLifeValue();
    }
  }

  getHourlyPlantLifeValue(): void {
    this.loading = true;
    this.dataService.getHourlyPlantLifeValue().pipe(take(1)).subscribe((data) => {
      console.log('get hourly value', data);
      this.loading = false;
      this.plantLifeValues = data;
      this.setPlantLifeValueData();
    })
  }

  getHourlyMachineLifeValue(): void {
    this.loading = true;
    this.dataService.getHourlyMachineLifeValue(this.selectedMachine).pipe(take(1)).subscribe((data) => {
      console.log('get hourly value', data);
      this.loading = false;
      this.machineLifeValues = data;
      this.setMachineLifeValueData();
    })
  }

  setPlantLifeValueData(): void {
    if (this.plantLifeValues && this.plantLifeValues.length) {
      this.noData = false;
      this.chartOptions.series = [];
      const time = this.plantLifeValues.map((data) => data.telemetry_hour.replace('.000Z', '')); // moment(data.telemetry_hour).format('YYYY-MM-DD HH:mm:ss')
      //const time = this.plantLifeValues.map((data) => (new Date(data.telemetry_hour)).toISOString() ); // moment(data.telemetry_hour).format('YYYY-MM-DD HH:mm:ss')
      const data = this.plantLifeValues.map((data) => data.plant_life_value);

      this.chartOptions.xAxis.categories = time;
      const series = {
        name: `R/A ratio`,
        data: data,
        color: CHART.MONITOR_CARDS.INDICATOR.color
      }
      this.chartOptions.series.push(series);
      this.chartOptions.title = '';
    } else {
      this.noData = true;
    }
    this.updateChart();
  }

  setMachineLifeValueData(): void {
    if (this.machineLifeValues && this.machineLifeValues.length) {
      this.noData = false;
      this.chartOptions.series = [];
      const time = this.machineLifeValues.map((data) => data.telemetry_hour.replace('.000Z', '')); // moment(data.telemetry_hour).format('YYYY-MM-DD HH:mm:ss')
      const data = this.machineLifeValues.map((data) => data.machine_life_value);

      this.chartOptions.xAxis.categories = time;
      const series = {
        name: `${this.selectedMachine.name} R/A ratio`,
        data: data,
        color: CHART.MONITOR_CARDS.INDICATOR.color
      }
      this.chartOptions.series.push(series);
      this.chartOptions.title = '';
    } else {
      this.noData = true;
    }
    this.updateChart();
  }

  updateChart(): void {
    this.showChart = false;
    // if (this.afterViewInitCalled) {
    setTimeout(() => {
      this.showChart = true;
    }, 50);
    // }
  }

}
