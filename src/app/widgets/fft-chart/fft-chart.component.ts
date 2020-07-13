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

  public data:any[] = new Array(4); 
  public chart: any;

  constructor() {
  }

  ngOnInit() { }

  private getNormalFreqLabel() {
    return `${NORMAL_FREQ_TITLE} : ${this.config.normal.name}`;
  }

  private getAbnormalFreqLabel() {
    if(this.config && this.config.abnormal)
      return `${ABNORMAL_FREQ_TITLE} : ${this.config.abnormal.name}`;
  }

  ngOnChanges(changes: SimpleChanges): void {


    if(!this.chart){
      this._createChart();
    } 

    if(this.normalFreq.length >0 ){
      this._renderNormalInstanceData();
    }
    if(this.abnormalFreq.length > 0){
      this._renderAbnormalInstanceData();
    }

    if(this.normalFreqAggregate && this.normalFreqAggregate.length > 0 ){
      this._renderNormalAggregateData();
    }
    if(this.abnormalFreqAggregate && this.abnormalFreqAggregate.length > 0){
      this._renderAbnormalAggregateData();
    }


    //Step 2 - Check if event is for fault selection dropdown.
    if(changes.fault){
       
      if(changes.fault.currentValue != null) { // value selected.
        console.log('fault dropdown selected.', changes.fault);
        this._renderStripLine();
      }
      else{ // clean button push event.
        console.log('clear stripline event...')
        this._removeStripLine(); 
      } 
       
    }
 
  }

  private _createChart(){
    // var _data = this.data;
    if(this.chart) 
       return;
      
 
      this.chart = new CanvasJS.Chart('fftchart', {
       ...GraphUtil.commonGraphOptions,
       exportEnabled: true,
       axisX: { 
         title: this.getNormalFreqLabel(),
         crosshair: {
           enabled: true
         },
         stripLines: []
       },
       axisX2:{title: this.getAbnormalFreqLabel(),},
       data:[{
         type: 'line',
         showInLegend: true,
         name: 'Normal dfft',
         color: GraphUtil.NORMAL_COLOR,
         toolTipContent:
           "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
         },  
         { 
           type: 'line',
           showInLegend: true,
           name: 'Abnormal dfft',
           color: GraphUtil.ABNORMAL_COLOR,
           lineDashType: 'dash',
           toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
           axisXType: 'secondary'
         },{
             type: 'line',
             showInLegend: true,
             name: 'Aggregate normal dfft',
             color: GraphUtil.NORMAL_COLOR_AGGREGATE,
             lineDashType: 'dash',
             toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
             axisXType: (this.config.normal && this.normalFreqAggregate) ? 'secondary' : 'primary'
         },{
           type: 'line',
           showInLegend: true,
           name: 'Aggregate abnormal dfft',
           color: GraphUtil.ABNORMAL_COLOR_AGGREGATE,
           lineDashType: 'dash',
           toolTipContent: "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>",
           axisXType: (this.config.abnormal && this.abnormalFreqAggregate) ? 'secondary' : 'primary',
         }]
     }); 
 
     //this.chart.render(); // Do we need to render the empty chart ???
   }

   private _renderNormalInstanceData(){
    console.log('fftchart._renderNormalInstanceData()');
 
      // Get the datapoints ready...
      var _d = this.normalFreq.map((freq: Frequency) => {
        return {
          x: freq.f,
          y: freq.v
        };
      });

      this.chart.options.data[0].dataPoints = _d; //assign it to chart.
      this.chart.render(); //render it.
  }

  private _renderAbnormalInstanceData(){
    console.log('ffftchart._renderAbnormalInstanceData()');
 
    var _d = this.abnormalFreq.map((freq: Frequency) => {
      return {
        x: freq.f,
        y: freq.v
      };
    });
    console.log('  ----  ', _d);
    this.chart.options.data[1].dataPoints = _d; //assign it to chart.
    
    this.chart.render(); //render it.
  }

  private _renderNormalAggregateData(){
    // console.log('dfftchart._renderNormalAggregateData()');
 
    var _d = this.normalFreqAggregate.map((freq: Frequency) => {
      return {
        x: freq.f,
        y: freq.v
      };
    });
    // console.log('  ----  ', _d);
    this.chart.options.data[2].dataPoints = _d; //assign it to chart.
    this.chart.render(); //render it.
  }
  private _renderAbnormalAggregateData(){
    // console.log('dfftchart._renderAbnormalAggregateData()');
 
    var _d = this.abnormalFreqAggregate.map((freq: Frequency) => {
      return {
        x: freq.f,
        y: freq.v
      };
    });
    // console.log('  ----  ', _d);
    this.chart.options.data[3].dataPoints = _d; //assign it to chart.
    this.chart.render(); //render it.
  }

  private _renderStripLine(){
    console.log('_renderStripline() executing....');
    
    // If fault is selected in dropdown 
    if(this.fault && this.fault.fault_frequencies){ 
      console.log('--- going to set stripline...');
      this.fault.fault_frequencies.map((v: number) => {
        this.chart.options.axisX.stripLines.push({
          value: v,
          color: GraphUtil.STRIP_COLOR,
          thickness: 2,
          showOnTop: true,
        }); 
        });
      this.chart.render();
      console.log('--- rendered.., ',this.chart.options.axisX.stripLines);
    }

  }

  private _removeStripLine(){
    this.chart.options.axisX.stripLines.splice(0, this.chart.options.axisX.stripLines.length);
    this.chart.render();
  }

  
}
