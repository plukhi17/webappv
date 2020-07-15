import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-machine-block',
  templateUrl: './machine-block.component.html',
  styleUrls: ['./machine-block.component.scss']
})
export class MachineBlockComponent implements OnInit {

  @Input('title') title: string;

  private _machines: Machine[] = [];
  @Input('machines')
  public get machines(): Machine[] {
    return this._machines;
  }
  public set machines(value: Machine[]) {
    this._machines = value;
    this.setMachines();
  }
  public formGroup: FormGroup;
  public searchMachine: FormControl = new FormControl();
  public filteredMachines: Machine[] = [];
  protected destoryed$ = new Subject<boolean>();
  public maxDateTime = new Date();
  aggregatedData: any;
  aggregatedMetrics: any[] = [];

  scatterChartOptions: { value: string, viewValue: string, color: any }[] = [
    {
      value: 'avg_riskscore', viewValue: 'Riskscore', color: ''
    },
    {
      value: 'runningpercent', viewValue: 'Running', color: ''
    },
    {
      value: 'idlepercent', viewValue: 'Idle', color: ''
    },
    {
      value: 'avg_i_rms', viewValue: 'I-RMS', color: ''
    },
    {
      value: 'starts', viewValue: 'No. of Starts', color: ''
    },
    {
      value: 'overloads', viewValue: 'Overloads', color: ''
    },
    {
      value: 'avg_power_in_kwh', viewValue: 'Power Consumption', color: ''
    },
    {
      value: 'warnings', viewValue: 'Warnings', color: ''
    },
    {
      value: 'stoppedpercent', viewValue: 'Stopped', color: ''
    },
  ];

  xAxisFilter: string = 'avg_riskscore';
  yAxisFilter: string = 'runningpercent';

  highcharts = Highcharts;
  chartOptions: Highcharts.Options | any = {
    title: {
      text: 'Scatter Chart'
    },
    plotOptions: {
      scatter: {
      }
    },
    series: [{
      type: 'scatter',
      zoomType: 'xy',
      name: 'Browser share',
      data: []
    }]
  };
  showChart: boolean = false;

  constructor(
    private dataService: DataService
  ) {
    this._initialiseFormGroup();
    this._setSelectFilters();
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit() {
  }

  compareWith(prev: Machine, next: Machine) {
    return prev && next && prev.id === next.id;
  }

  setMachines() {
    if (!this.searchMachine.value) {
      this.filteredMachines = this.machines.slice();
    }
  }

  /**
     * Sets a default date if not selected.
     *
     * @param event: Object
     */
  syncTimestamp(event): void {
    this.f.fromToDate.setValue(event.value);
  }

  private _setSelectFilters() {
    this.searchMachine
      .valueChanges
      .pipe(
        takeUntil(this.destoryed$)
      ).subscribe(
        (value) => {
          this.filterMachines(value);
        }
      );
  }

  private filterMachines(value: string) {
    if (!this.machines || !this.machines.length) {
      return;
    }

    if (!value || !value.trim) {
      this.filteredMachines = this.machines.slice();
      return;
    } else {
      value = value.toLowerCase();
    }
    // filter normal machines
    this.filteredMachines = this.machines.filter(machine => machine.name.toLowerCase().indexOf(value) > -1);
  }

  loadData(): void {
    const data: any = this.formGroup.value;
    this.dataService.getHourlyAggregatedData(data.machine, moment(data.fromToDate[0]).format('YYYY-MM-DD HH:mm:ss'), moment(data.fromToDate[1]).format('YYYY-MM-DD HH:mm:ss'))
      .pipe(take(1)).subscribe((data) => {
        console.log('load data response', data);
        this.aggregatedData = data;
      });
    this.dataService.getHourlyAggregatedMetrics(data.machine, moment(data.fromToDate[0]).format('YYYY-MM-DD HH:mm:ss'), moment(data.fromToDate[1]).format('YYYY-MM-DD HH:mm:ss'))
      .pipe(take(1)).subscribe((data) => {
        console.log('load data getHourlyAggregatedMetrics response', data);
        this.aggregatedMetrics = data;
        this.updateChartData();
      });
  }

  private _initialiseFormGroup(): void {
    this.formGroup = new FormGroup({
      machine: new FormControl(null),
      fromToDate: new FormControl(null)
    });
  }


  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destoryed$.next(true);
    this.destoryed$.complete();
  }

  updateChartData(): void {
    if (this.aggregatedMetrics) {
      this.chartOptions.series = [];
      const xAxis = this.scatterChartOptions.filter((e) => e.value === this.xAxisFilter)[0];
      const yAxis = this.scatterChartOptions.filter((e) => e.value === this.yAxisFilter)[0];
      const series = {
        type: 'scatter',
        zoomType: 'xy',
        name: `${xAxis.viewValue} x ${yAxis.viewValue}`,
        data: this.aggregatedMetrics.map((e) => [e[this.xAxisFilter], e[this.yAxisFilter]])
      }
      this.chartOptions.series.push(series);
      this.chartOptions.title.text = `${xAxis.viewValue} x ${yAxis.viewValue}`;
      this.chartOptions.plotOptions.scatter.tooltip = {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: `{point.x} ${xAxis.viewValue}, {point.y} ${yAxis.viewValue}`
      }
      console.log('chart series', this.chartOptions.series);
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
