import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Frequency, MachineFault, DataConfig,MachineStatusAvailabilityData} from "../../interfaces";
import * as CanvasJS from "../canvasjs.min.js";
import GraphUtil from '../../utils/graph.util';

const NORMAL_FREQ_TITLE = 'Normal Machine';
const ABNORMAL_FREQ_TITLE = 'Abnormal Machine';

@Component({
  selector: "app-diagnose-chart",
  templateUrl: "./diagnose-chart.component.html",
  styleUrls: ["./diagnose-chart.component.scss"]
})
export class DiagnoseChartComponent implements OnChanges, OnInit {
  @Input() config: DataConfig;  
  @Input() normalMachineStatus:MachineStatusAvailabilityData;
  @Input() abnormalMachineStatus:MachineStatusAvailabilityData;
  @Input() changeStatus:boolean;
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes.normalMachineStatus ||changes.abnormalMachineStatus){
       this._renderChart();
    }   

    if(changes.changeStatus){
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
  
    CanvasJS.addColorSet("mintoShades",
    [//colorSet Array
    "#7AAC8D",
    "#F6AA54",
    "#DE3B00"              
    ]); 

    if(this.normalMachineStatus){

      const data = [];

      if(this.changeStatus == false){
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          showInLegend: false,    
          dataPoints: [
            { y: this.normalMachineStatus.normal_percentage, label: "Normal" },
            { y: this.normalMachineStatus.warning_percentage, label: "Warning" },
            { y: this.normalMachineStatus.critical_percentage, label: "Critical" } 
            ],
        });  
      }else{
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          showInLegend: false,    
          dataPoints: [
            { y: this.normalMachineStatus.running, label: "Running" },
            { y: this.normalMachineStatus.idle, label: "Idle" },
            { y: this.normalMachineStatus.stopped, label: "Stopped" } 
            ],
        });
      } 
      var chart = new CanvasJS.Chart("diagnosechart", {
        colorSet: "mintoShades",
        animationEnabled: true, 
        exportEnabled: true,
        title:{
          text:this.getNormalFreqLabel()
        },
        axisX:{
          interval: 1
        },
        data    

      });

      chart.render();
    }

    if(this.abnormalMachineStatus){
      const data = [];
      if(this.changeStatus == false){

        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          showInLegend: false,    
          dataPoints: [
            { y: this.abnormalMachineStatus.normal_percentage, label: "Normal" },
            { y: this.abnormalMachineStatus.warning_percentage, label: "Warning" },
            { y: this.abnormalMachineStatus.critical_percentage, label: "Critical" } 
            ],
        });  

      }else{
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          showInLegend: false,    
          dataPoints: [
            { y: this.abnormalMachineStatus.running, label: "Running" },
            { y: this.abnormalMachineStatus.idle, label: "Idle" },
            { y: this.abnormalMachineStatus.stopped, label: "Stopped" } 
            ],
        });
      } 

      var abnormalChart = new CanvasJS.Chart("abnormalDiagnosechart", {
        colorSet: "mintoShades",
        animationEnabled: true, 
        exportEnabled: true,
        title:{
          text:this.getAbnormalFreqLabel()
        },
        axisX:{
          interval: 1
        },
        data

      });

      abnormalChart.render();
    }

  }
 
   
}
