import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Frequency, MachineFault, DataConfig } from "../../interfaces";
import * as CanvasJS from "../canvasjs.min.js";
import GraphUtil from '../../utils/graph.util';


const NORMAL_FREQ_TITLE = 'Normal Machine';
const ABNORMAL_FREQ_TITLE = 'Abnormal Machine';

@Component({
  selector: "app-fft-chart",
  templateUrl: "./fft-chart.component.html",
  styleUrls: ["./fft-chart.component.scss"]
})
export class FftChartComponent implements OnChanges, OnInit {
  @Input() abnormalFreq: Frequency[];
  @Input() normalFreq: Frequency[];
  @Input() fault: MachineFault;
  @Input() config: DataConfig;
  @Input() normalFreqAggregate: Frequency[];
  @Input() abnormalFreqAggregate: Frequency[];

  constructor() {
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.normalFreq && changes.normalFreq.currentValue) ||
      (changes.abnormalFreq && changes.abnormalFreq.currentValue)
    ) {
      this._renderChart();
    } else if (
      changes.fault &&
      (changes.fault.currentValue || changes.fault.currentValue === null)
    ) {
      this._renderChart();
    } else if( changes.normalFreqAggregate ){
      console.log('dfft-chart.component.ngOnchange.normalFreqAggregate. calling render function()');
      this._renderChart();
    } else if( changes.AbnormalFreqAggregate ){
      console.log('dfft-chart.component.ngOnchange.abNormalFreqAggregate. calling render function()');
      this._renderChart();
    }
  }

  private getNormalFreqLabel() {
    return `${NORMAL_FREQ_TITLE} : ${this.config.normal.name}`;
  }

  private getAbnormalFreqLabel() {
    return `${ABNORMAL_FREQ_TITLE} : ${this.config.abnormal.name}`;
  }

  // private _renderChart(): void {
  //   const data = [];
  //   if (this.config.abnormal && this.abnormalFreq) {
  //     data.push({
  //       type: 'line',
  //       showInLegend: true,
  //       name: this.getAbnormalFreqLabel(),
  //       color: GraphUtil.ABNORMAL_COLOR,
  //       dataPoints: this.abnormalFreq.map((freq: Frequency) => {
  //         return {
  //           x: freq.f,
  //           y: freq.v
  //         };
  //       }),
  //       toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
  //       axisXType: (this.config.abnormal && this.abnormalFreq) ? 'secondary' : 'primary',
  //     });
  //   }

  //   if (this.config.normal && this.normalFreq) {
  //     data.push({
  //       type: 'line',
  //       showInLegend: true,
  //       name: this.getNormalFreqLabel(),
  //       color: GraphUtil.NORMAL_COLOR,
  //       dataPoints: this.normalFreq.map((freq: Frequency) => {
  //         return {
  //           x: freq.f,
  //           y: freq.v
  //         };
  //       }),
  //       toolTipContent: "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
  //     });
  //   }

  //   let axisX;
  //   let axisX2;
  //   if (this.normalFreq && this.abnormalFreq) {
  //     axisX = {
  //       title: this.getNormalFreqLabel()
  //     };
  //     axisX2 = {
  //       title: this.getAbnormalFreqLabel()
  //     };
  //   } else if (this.abnormalFreq) {
  //     axisX = {
  //       title: this.getAbnormalFreqLabel()
  //     };
  //   } else {
  //     axisX = {
  //       title: this.getNormalFreqLabel()
  //     };
  //   }


  //   const chart = new CanvasJS.Chart("fftchart", {
  //     ...GraphUtil.commonGraphOptions,
  //     axisX: {
  //       ...(axisX ? axisX : {}),
  //       crosshair: {
  //         enabled: true
  //       },
  //       stripLines: this.fault
  //         ? this.fault.fault_frequencies.map((v: number) => {
  //           return {
  //             value: v,
  //             color: GraphUtil.STRIP_COLOR
  //           };
  //         })
  //         : []
  //     },
  //     axisX2,
  //     data
  //   });

  //   chart.render();
  // }

  private _renderChart(): void {
    const data = [];
    if (this.config.abnormal && this.abnormalFreq) {
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Abnormal fft',
        color: GraphUtil.ABNORMAL_COLOR,
        lineDashType: "dash",
        dataPoints: this.abnormalFreq.map((freq: Frequency) => {
          return {
            x: freq.f,
            y: freq.v
          };
        }),
        toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
        axisXType: (this.config.abnormal && this.abnormalFreq) ? 'secondary' : 'primary',
      });
    }

    if (this.config.normal && this.normalFreq) {
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Normal fft',
        color: GraphUtil.NORMAL_COLOR,
        dataPoints: this.normalFreq.map((freq: Frequency) => {
          return {
            x: freq.f,
            y: freq.v
          };
        }),
        toolTipContent:
          "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
      });
    }


// Insert data for normal machine aggregate data...
console.log('About to push the normal aggregate data to graph...');
if (this.config.normal && this.normalFreqAggregate && this.normalFreqAggregate.length > 0) {
  console.log('pushing the normal aggregate data to graph...');
  console.log(this.normalFreqAggregate);

  data.push({
    type: 'line',
    showInLegend: true,
    name: 'Aggregate normal fft',
    color: GraphUtil.NORMAL_COLOR_AGGREGATE,
    lineDashType: 'dash',
    dataPoints: this.normalFreqAggregate.map((freq: Frequency) => {
      return {
        x: freq.f,
        y: freq.v
      };
    }),
    toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
    axisXType: (this.config.normal && this.normalFreqAggregate) ? 'secondary' : 'primary',
  });
}


// Insert data for abnormal machine aggregate data...
console.log('About to push the abnormal aggregate data to graph...');
if (this.config.abnormal && this.abnormalFreqAggregate && this.abnormalFreqAggregate.length > 0) {
console.log('pushing the abnormal aggregate data to graph...');
//console.log(this.normalFreqAggregate);

data.push({
  type: 'line',
  showInLegend: true,
  name: 'Aggregate abnormal fft',
  color: GraphUtil.ABNORMAL_COLOR_AGGREGATE,
  lineDashType: 'dash',
  dataPoints: this.abnormalFreqAggregate.map((freq: Frequency) => {
    return {
      x: freq.f,
      y: freq.v
    };
  }),
  toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
  axisXType: (this.config.abnormal && this.abnormalFreqAggregate) ? 'secondary' : 'primary',
});
}


    let axisX;
    let axisX2;
    if (this.config.abnormal && this.config.normal && this.normalFreq && this.abnormalFreq) {
      axisX = {
        title: this.getNormalFreqLabel()
      };
      axisX2 = {
        title: this.getAbnormalFreqLabel()
      };
    } else if (this.config.abnormal && this.abnormalFreq) {
      axisX = {
        title: this.getAbnormalFreqLabel()
      };
    } else if (this.config.normal && this.normalFreq) {
      axisX = {
        title: this.getNormalFreqLabel()
      };
    }

    const chart = new CanvasJS.Chart('fftchart', {
      ...GraphUtil.commonGraphOptions,
      exportEnabled: true,
      axisX: {
        ...(axisX ? axisX : {}),
        crosshair: {
          enabled: true
        },
        stripLines: this.fault
          ? [
            ...this.fault.fault_frequencies.map((v: number) => {
              return {
                value: this.fault.fault_id !== -1 ? (50 + v) : v,
                color: GraphUtil.STRIP_COLOR,
                thickness: 2,
                showOnTop: true,
              };
            }),
            ...this.fault.fault_frequencies.map((v: number) => {
              return {
                value: this.fault.fault_id !== -1 ? (50 - v) : v,
                color: GraphUtil.STRIP_COLOR,
                thickness: 2,
                showOnTop: true,
              };
            })
          ]
          : []
      },
      axisX2,
      data,
      axisY: {
        gridThickness: 0,
        tickLength: 0,
        // lineThickness: 0,
        // labelFormatter: function (e) {
        //   if(e.value == -45) {
        //     return e.value;
        //   }
        //   return '';
        // } ,
        stripLines: [
          {
            value: -45,
            color: "#ff1717",
            label: "-45",
            lineDashType: 'dot',
            labelPlacement: "outside",
            labelFontColor: "#000",
            thickness: 2,
            labelBackgroundColor: 'transparent'
          }
        ],

      }
    });

    chart.render();
  }
}
