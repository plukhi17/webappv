import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataConfig, DataPoint } from '../../interfaces';
import { MaintenanceDates } from 'src/app/interfaces/maintenance-dates.interface';
import uuid from 'uuid';
import * as CanvasJS from '../canvasjs.min';
import GraphUtil from '../../utils/graph.util';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

const NORMAL_FREQ_TITLE = 'Normal Machine';
const ABNORMAL_FREQ_TITLE = 'Abnormal Machine';

@Component({
  selector: 'app-freq-chart',
  templateUrl: './freq-chart.component.html',
  styleUrls: ['./freq-chart.component.scss']
})
export class FreqChartComponent implements OnChanges, OnInit {

  readonly id: string;
  @Input() abnormalData: DataPoint[];
  @Input() normalData: DataPoint[];
  @Input() config: DataConfig;
  @Input() configOption: any;
  @Input() fault: any;
  @Input() maintenanceDate: any;
  @Input() formGroup: FormGroup;
  public freqFromValue;
  public minimum: 0;
  public freqToValue;
  public labels = {};
  public formValues = [];
  // public savitzkyGolay = require('ml-savitzky-golay');

  private graphLabelOptions = {
    enabled: {
      labelFontColor: '#000',
      tickLength: 5
    },
    disabled: {
      labelFontColor: '',
      tickLength: 0
    }
  }

  constructor() {
    this.id = 'd-' + uuid.v4();

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('freq chart onChange', this.formGroup.value);
    if (this.formGroup.value) {

      this.freqFromValue = this.formGroup.value.from;
      this.freqToValue = this.formGroup.value.to;

      const { normal_from, normal_to, abnormal_from, abnormal_to } = this.formGroup.value;

      if (normal_from && normal_to && abnormal_from && abnormal_to) {
        this.formValues.push(this.formGroup.value.normal_from);
        this.formValues.push(this.formGroup.value.normal_to);
        this.formValues.push(this.formGroup.value.abnormal_from);
        this.formValues.push(this.formGroup.value.abnormal_to);

        this.freqFromValue = Math.min(...this.formValues);
        this.freqToValue = Math.max(...this.formValues);
        // console.log('min max', this.freqFromValue, this.freqToValue);

      } else if (normal_from && normal_to) {
        this.freqFromValue = normal_from;
        this.freqToValue = normal_to;
        // console.log('min max', this.freqFromValue, this.freqToValue);

      } else if (abnormal_from && abnormal_to) {
        this.freqFromValue = abnormal_from;
        this.freqToValue = abnormal_to;
        // console.log('min max', this.freqFromValue, this.freqToValue);

      }

    }

    if ((changes.normalData && changes.normalData.currentValue) ||
      (changes.abnormalData && changes.abnormalData.currentValue)) {
      this._renderChart();
    }

  }

  private getNormalFreqLabel() {
    if (this.config.normal && this.config.normal.name) {
      return `${NORMAL_FREQ_TITLE} : ${this.config.normal.name}`;
    } else {
      return NORMAL_FREQ_TITLE;
    }
  }

  private getAbnormalFreqLabel() {
    if (this.config.abnormal && this.config.abnormal.name) {
      return `${ABNORMAL_FREQ_TITLE} : ${this.config.abnormal.name}`;
    } else {
      return ABNORMAL_FREQ_TITLE;
    }
  }


  // private _renderChart(): void {
  //     const data = [];
  //     if (this.abnormalData) {
  //         data.push({
  //             type: 'line',
  //             showInLegend: true,
  //             name: this.getAbnormalFreqLabel(),
  //             color: GraphUtil.ABNORMAL_COLOR,
  //             dataPoints: this.abnormalData,
  //             toolTipContent: '{x}<br/> <span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
  //             axisXType: this.normalData ? 'secondary' : 'primary',
  //         });
  //     }
  //     if (this.normalData) {
  //         data.push({
  //             type: 'line',
  //             showInLegend: true,
  //             name: this.getNormalFreqLabel(),
  //             color: GraphUtil.NORMAL_COLOR,
  //             dataPoints: this.normalData,
  //             toolTipContent: '<span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
  //         });
  //     }

  //     let axisX;
  //     let axisX2;
  //     if (this.normalData && this.abnormalData) {
  //         axisX = { title: this.getNormalFreqLabel() };
  //         axisX2 = { title: this.getAbnormalFreqLabel() };
  //     } else if (this.abnormalData) {
  //         axisX = { title: this.getAbnormalFreqLabel() };
  //     } else {
  //         axisX = { title: this.getNormalFreqLabel() };
  //     }

  //     const chart = new CanvasJS.Chart('freqChart', {
  //         ...GraphUtil.commonGraphOptions,
  //         axisX,
  //         axisX2,
  //         data
  //     });

  //     chart.render();
  // }

  private _renderChart(): void {
    const data = [];
    const ffaIrmsData = [];

    if (this.config.abnormal && this.abnormalData) {
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Abnormal Amplitude',
        color: GraphUtil.ABNORMAL_COLOR,
        lineDashType: 'dash',
        dataPoints: this.abnormalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisXType: (this.config.abnormal && this.abnormalData) ? 'secondary' : 'primary',
      });

      data.push({
        type: 'line',
        lineDashType: 'dash',
        showInLegend: true,
        visible: false,
        name: 'Abnormal Speed',
        color: GraphUtil.ABNORMAL_COLOR,
        dataPoints: this.abnormalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y2
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisXType: (this.config.abnormal && this.abnormalData) ? 'secondary' : 'primary',
        axisYType: 'secondary',

      });

      ffaIrmsData.push({
        type: 'line',
        showInLegend: true,
        name: 'Abnormal i-rms',
        color: GraphUtil.ABNORMAL_COLOR,
        lineDashType: 'dash',
        dataPoints: this.abnormalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y3
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisXType: (this.config.abnormal && this.abnormalData) ? 'secondary' : 'primary',
      });

      ffaIrmsData.push({
        type: 'line',
        lineDashType: 'dash',
        showInLegend: true,
        visible: false,
        name: 'Abnormal Risk Score',
        color: GraphUtil.ABNORMAL_COLOR,
        dataPoints: this.abnormalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y4
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisXType: (this.config.abnormal && this.abnormalData) ? 'secondary' : 'primary',
        axisYType: 'secondary',

      });
    }

    if (this.config.normal && this.normalData) {
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Normal Amplitude',
        color: GraphUtil.NORMAL_COLOR,
        dataPoints: this.normalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y
          };
        }),
        toolTipContent:
          "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
      });

      ffaIrmsData.push({
        type: 'line',
        showInLegend: true,
        name: 'Normal i-rms',
        color: GraphUtil.NORMAL_COLOR,
        dataPoints: this.normalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y3
          };
        }),
        toolTipContent:
          "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
      });


      data.push({
        type: 'line',
        lineDashType: 'dash',
        showInLegend: true,
        visible: false,
        name: 'Normal Speed',
        color: GraphUtil.NORMAL_COLOR,
        dataPoints: this.normalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y2
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisYType: 'secondary'
      });


      ffaIrmsData.push({
        type: 'line',
        lineDashType: 'dash',
        showInLegend: true,
        visible: false,
        name: 'Normal Risk Score',
        color: GraphUtil.NORMAL_COLOR,
        dataPoints: this.normalData.map((freq: DataPoint) => {
          return {
            x: freq.x,
            y: freq.y4
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisYType: 'secondary'
      });
    }

    let axisX;
    let axisX2;

    if (this.normalData && this.abnormalData) {
      axisX = {
        title: this.getNormalFreqLabel()
      };
      axisX2 = {
        title: this.getAbnormalFreqLabel()
      };
    } else if (this.abnormalData) {
      axisX = {
        title: this.getAbnormalFreqLabel()
      };
    } else {
      axisX = {
        title: this.getNormalFreqLabel()
      };
    }


    let normalMinimum, abnormalMinimum;
    if (data.length > 0) {
      if (data[0].dataPoints.length > 0) {
        abnormalMinimum = data[0].dataPoints[0].x
      }
      // console.log('abnormalMinimum', abnormalMinimum);

      if (data[1].dataPoints.length > 0) {
        normalMinimum = data[1].dataPoints[0].x
      }
      // console.log('normalMinimum', normalMinimum);
    }

    const chart = new CanvasJS.Chart('freqChart', {
      ...GraphUtil.commonGraphOptions,
      toolTip: {
        shared: false
      },
      axisX: {
        ...(axisX ? axisX : {}),
        crosshair: {
          enabled: true
        },
        stripLines: this.maintenanceDate.normalDates.map((date: MaintenanceDates) => {
          const momentDate = moment(date.maintenance_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
          const dateObj = new Date(momentDate.utc().year(), momentDate.utc().month(), momentDate.utc().date(), momentDate.utc().hours(), momentDate.utc().minutes());
          return {
            value: dateObj,
            color: GraphUtil.STRIP_COLOR,
            thickness: 2,
            showOnTop: true,
          };
        })
      },
      axisX2: {
        ...(axisX2 ? axisX2 : {}),
        stripLines: this.maintenanceDate.abnormalDates.map((date: MaintenanceDates) => {
          const momentDate = moment(date.maintenance_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
          const dateObj = new Date(momentDate.utc().year(), momentDate.utc().month(), momentDate.utc().date(), momentDate.utc().hours(), momentDate.utc().minutes());
          return {
            value: dateObj,
            color: GraphUtil.STRIP_COLOR,
            thickness: 2,
            showOnTop: true,
            lineDashType: 'dash',
          };
        })
      },
      axisY2
        : {
        viewportMinimum: this.freqFromValue,
        viewportMaximum: this.freqToValue,
        ...this.graphLabelOptions.disabled
      },
      data,
      legend: {
        itemclick: (e) => {

          if (e.dataSeries.visible) {
            e.dataSeries.visible = false
          } else {
            e.dataSeries.visible = true;
          }
          this.labels[e.dataSeries.name] = e.dataSeries.visible;
          const visibleFilters = Object.values(this.labels).filter(val => val);
          e.chart.options.axisY2 = {
            ...e.chart.options.axisY2,
            ...(visibleFilters && visibleFilters.length ? this.graphLabelOptions.enabled : this.graphLabelOptions.disabled)
          };
          e.chart.render();
        }
      }
    });

    chart.render();

    const otherChart = new CanvasJS.Chart('ffaIrmsChart', {
      ...GraphUtil.commonGraphOptions,
      toolTip: {
        shared: false
      },
      axisX: {
        ...(axisX ? axisX : {}),
        crosshair: {
          enabled: true
        },
        stripLines: this.maintenanceDate.normalDates.map((date: MaintenanceDates) => {
          const momentDate = moment(date.maintenance_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
          const dateObj = new Date(momentDate.utc().year(), momentDate.utc().month(), momentDate.utc().date(), momentDate.utc().hours(), momentDate.utc().minutes());
          return {
            value: dateObj,
            color: GraphUtil.STRIP_COLOR,
            thickness: 2,
            showOnTop: true,
          };
        })
      },
      axisX2: {
        ...(axisX2 ? axisX2 : {}),
        // stripLines: this.maintenanceDate.abnormalDates.map((date: MaintenanceDates) => ({
        //   value: new Date(date.maintenance_date),
        //   color: GraphUtil.STRIP_COLOR,
        //   thickness: 2,
        //   showOnTop: true,
        //   // lineDashType: 'dot'
        // }))
        stripLines: this.maintenanceDate.abnormalDates.map((date: MaintenanceDates) => {
          const momentDate = moment(date.maintenance_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
          const dateObj = new Date(momentDate.utc().year(), momentDate.utc().month(), momentDate.utc().date(), momentDate.utc().hours(), momentDate.utc().minutes());
          return {
            value: dateObj,
            color: GraphUtil.STRIP_COLOR,
            thickness: 2,
            showOnTop: true,
            lineDashType: 'dash',
          };
        })
      },
      axisY2: {
        // viewportMinimum: this.freqFromValue,
        // viewportMaximum: this.freqToValue,
        ...this.graphLabelOptions.disabled
      },
      data: ffaIrmsData,
      legend: {
        itemclick: (e) => {

          if (e.dataSeries.visible) {
            e.dataSeries.visible = false
          } else {
            e.dataSeries.visible = true;
          }
          this.labels[e.dataSeries.name] = e.dataSeries.visible;
          const visibleFilters = Object.values(this.labels).filter(val => val);
          e.chart.options.axisY2 = {
            ...e.chart.options.axisY2,
            ...(visibleFilters && visibleFilters.length ? this.graphLabelOptions.enabled : this.graphLabelOptions.disabled)
          };
          e.chart.render();
        }
      }
    });

    otherChart.render();
  }


}
