import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input, HostListener } from '@angular/core';
import { DoughnutChartComponent } from 'src/app/widgets/shared/doughnut-chart/doughnut-chart.component';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { CHART } from 'src/app/constants/chart.constant';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-monitor-semipie',
  templateUrl: './monitor-semipie.component.html',
  styleUrls: ['./monitor-semipie.component.scss']
})
export class MonitorSemipieComponent implements OnInit {

  data: { y: number, label: string }[] = [];
  @ViewChildren('doughnutChart') charts: QueryList<DoughnutChartComponent>;

  private _realTimeData: RealTimeData[];
  @Input('data')
  public get realTimeData(): RealTimeData[] {
    return this._realTimeData;
  }
  public set realTimeData(value: RealTimeData[]) {
    this._realTimeData = value;
    this.updateChartData();
  }

  runningMachines: number = 0;
  idleMachines: number = 0;
  stoppedMachines: number = 0;


  runningCountChart = {
    data: [],
    subtitles: []
  }

  idleCountChart = {
    data: [],
    subtitles: []
  }

  stoppedCountChart = {
    data: [],
    subtitles: []
  }

  afterViewInitCalled = false;
  showChart = false;
  highcharts = Highcharts;
  generalChartOptions: Highcharts.Options | any = {
    title: {
      align: 'center',
      verticalAlign: 'middle',
      y: 70,
      style: {
        fontSize: '14px',
        width: '150px'
      }
    },
    plotOptions: {
      series: {
        animation: false
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',

        // dataLabels: {
        //   enabled: true
        // },
        dataLabels: {
          enabled: true,
          distance: -75,
          format: `{point.y}`,
          style: {
            color: 'black',
            fontSize: '24px'
          }
        },
        // minSize: '400px',
        showInLegend: false,
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '90%'],
        size: '180%'
      }
    },
    series: [],
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>'
    }
  };

  runningChartOptions: Highcharts.Options | any;
  idleChartOptions: Highcharts.Options | any;
  stoppedChartOptions: Highcharts.Options | any;
  unknownChartOptions: Highcharts.Options | any;

  constructor() {
    this.runningChartOptions = JSON.parse(JSON.stringify(this.generalChartOptions));
    this.idleChartOptions = JSON.parse(JSON.stringify(this.generalChartOptions));
    this.stoppedChartOptions = JSON.parse(JSON.stringify(this.generalChartOptions));
    this.unknownChartOptions = JSON.parse(JSON.stringify(this.generalChartOptions));
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.afterViewInitCalled = true;
  }

  updateChartData(): void {
    if (this.realTimeData) {
      this.runningMachines = 0;
      this.idleMachines = 0;
      this.stoppedMachines = 0;
      
      this.realTimeData.forEach((data) => {
        if (data.availabilty_status === 'Running') {
          this.runningMachines++;
        }
        if (data.availabilty_status === 'Idle') {
          this.idleMachines++;
        }
        if (data.availabilty_status === 'Stopped') {
          this.stoppedMachines++;
        }
       



      })
    }
    // this.runningCountChart.data = [{ y: this.runningMachines, color: CHART.MONITOR_SEMIPIE.RUNNING.color }]; // "#C0504E"
    // this.runningCountChart.subtitles = [{ text: this.runningMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    this.updateChartData2([{ name: 'Running', y: this.runningMachines, color: CHART.MONITOR_SEMIPIE.RUNNING.color }], 'No. of Running Machines', this.runningChartOptions);

    // this.idleCountChart.data = [{ y: this.idleMachines, color: CHART.MONITOR_SEMIPIE.IDLE.color }];
    // this.idleCountChart.subtitles = [{ text: this.idleMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    this.updateChartData2([{ name: 'Idle', y: this.idleMachines, color: CHART.MONITOR_SEMIPIE.IDLE.color }], 'No. of Idle Machines', this.idleChartOptions);

    // this.stoppedCountChart.data = [{ y: this.stoppedMachines, color: CHART.MONITOR_SEMIPIE.STOPPED.color }];
    // this.stoppedCountChart.subtitles = [{ text: this.stoppedMachines, verticalAlign: "center", dockInsidePlotArea: true, maxWidth: 30, fontSize: 14 }];

    this.updateChartData2([{ name: 'Stopped', y: this.stoppedMachines, color: CHART.MONITOR_SEMIPIE.STOPPED.color }], 'No. of Stopped Machines', this.stoppedChartOptions);



    // setTimeout(() => {
    //   this.refreshChart();
    // }, 200);
  }

  updateChartData2(data: any[], title: string, chartOptions: Highcharts.Options | any): void {
    if (this.realTimeData && this.realTimeData.length) {
      chartOptions.series = [];
      const series = {
        type: 'pie',
        name: `Monitor Status`,
        data: data,
        innerSize: '70%'
      }
      chartOptions.series.push(series);
      chartOptions.title.text = title;
      console.log('chart series', chartOptions.series);
    }
    this.updateChart();
  }

  refreshChart(): void {
    if (this.charts) {
      this.charts.forEach((chart) => {
        chart._renderChart();
      })
    }
  }

  updateChart(): void {
    this.showChart = false;
    if (this.afterViewInitCalled) {
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    }
  }

}
