import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Frequency, MachineFault, DataConfig,DataConfigEx} from "../../interfaces";
import * as CanvasJS from "../canvasjs.min.js";
import GraphUtil from '../../utils/graph.util';

const NORMAL_FREQ_TITLE = 'Normal Machine';
const ABNORMAL_FREQ_TITLE = 'Abnormal Machine';

@Component({
  selector: "app-dfft-chart",
  templateUrl: "./dfft-chart.component.html",
  styleUrls: ["./dfft-chart.component.scss"]
})
export class DfftChartComponent implements OnChanges, OnInit {
  @Input() abnormalFreq: Frequency[];
  @Input() normalFreq: Frequency[];
  @Input() fault: MachineFault;
  @Input() config: DataConfig;
  @Input() configEx: DataConfigEx;
  @Input() normalFreqAggregate: Frequency[];
  @Input() abnormalFreqAggregate: Frequency[];
  
  
  // @Input() selectedOrder: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.configEx){
      console.log('----- ConfigEx event received....-----');
    }
// Instance data 
    if ( (changes.normalFreq && changes.normalFreq.currentValue) ||
          (changes.abnormalFreq && changes.abnormalFreq.currentValue)  ) 
          {
          this._renderChart();
    } else if ( changes.fault && (changes.fault.currentValue || changes.fault.currentValue === null)) { // When frequency dropdown of vertical line changed
      this._renderChart(); 
    } else if( changes.normalFreqAggregate ){ // When Aggregate radio button is selected and load data is clicked.
      console.log('dfft-chart.component.ngOnchange.normalFreqAggregate. calling render function()');
      this._renderChart();
    }else if( changes.AbnormalFreqAggregate ){
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

  private _renderChart(): void {
    const data = [];
    // const sortedAbnormalData = this.selectedOrder === 'aces' ? this.abnormalFreq.sort(
    //   (prev, next) => prev.f - next.f
    // ) : this.abnormalFreq.sort(
    //   (prev, next) => next.f - prev.f
    // );
    // const sortedNormalData = this.selectedOrder === 'aces' ? this.normalFreq.sort(
    //   (prev, next) => prev.f - next.f
    // ) : this.normalFreq.sort(
    //   (prev, next) => next.f - prev.f
    // );
    // console.log('sortedData', sortedAbnormalData)
    // console.log('this.selectedOrder`', this.selectedOrder)
    if (this.config.abnormal && this.abnormalFreq) {
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Abnormal dfft',
        color: GraphUtil.ABNORMAL_COLOR,
        lineDashType: 'dash',
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
      console.log('dfft - pushing the normal data to graph...');
      // console.log(this.normalFreq);
      data.push({
        type: 'line',
        showInLegend: true,
        name: 'Normal dfft',
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
        name: 'Aggregate normal dfft',
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
      name: 'Aggregate abnormal dfft',
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

    const chart = new CanvasJS.Chart('ddftchart', {
      ...GraphUtil.commonGraphOptions,
      exportEnabled: true,
      axisX: {
        ...(axisX ? axisX : {}),
        crosshair: {
          enabled: true
        },
        stripLines: this.fault
          ? this.fault.fault_frequencies.map((v: number) => {
            return {
              value: v,
              color: GraphUtil.STRIP_COLOR,
              thickness: 2,
              showOnTop: true,
            };
          })
          : []
      },
      axisX2,
      data
    });
    
    chart.render();
  }
}
