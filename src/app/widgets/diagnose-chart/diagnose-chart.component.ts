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
      "#DE3B00",
      "#F6AA54",
      "#7AAC8D"           
    ]); 
    let axisY2;
    
    if(this.normalMachineStatus){

      const data = [];

      if(this.changeStatus == false){
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          yValueFormatString: "#,##0\"%\"",
          showInLegend: false,    
          indexLabelPlacement: "inside",  
          dataPoints: [
            { y: this.normalMachineStatus.critical_percentage, label: "Critical" ,indexLabel: this.normalMachineStatus.critical_percentage.toString(),},
            { y: this.normalMachineStatus.warning_percentage, label: "Warning" ,indexLabel: this.normalMachineStatus.warning_percentage.toString(),},
            { y: this.normalMachineStatus.normal_percentage, label: "Normal" ,indexLabel: this.normalMachineStatus.normal_percentage.toString(),},
            ],
          
        });  

        axisY2 = {
          maximum: 100,
          minimum: 0,
        };
      }else{
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          yValueFormatString: "#,##0\"%\"",
          showInLegend: false,  
          indexLabelPlacement: "inside",   
          dataPoints: [
            { y: this.normalMachineStatus.stopped, label: "Stopped",indexLabel: this.normalMachineStatus.stopped.toString()+"%",},
            
            { y: this.normalMachineStatus.idle, label: "Idle" ,indexLabel: this.normalMachineStatus.idle.toString()+"%",},
            
            { y: this.normalMachineStatus.running, label: "Running",indexLabel: this.normalMachineStatus.running.toString()+"%",},
            ],
          
        });

        axisY2 = {
          maximum: 100,
          minimum: 0,
          suffix: "%",
        };
        
      } 
      var chart = new CanvasJS.Chart("diagnosechart", {
        colorSet: "mintoShades",
        animationEnabled: true, 
        exportEnabled: true,
        title:{
          text:this.getNormalFreqLabel(),
          fontSize: 20,
          fontWeight: "lighter",
        },
        axisX:{
          interval: 1
        },
        axisY: {
          suffix: "%",
        },
        axisY2,
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
          yValueFormatString: "#,##0\"%\"",
          showInLegend: false,    
          indexLabelPlacement: "inside", 
          dataPoints: [
            { y: this.abnormalMachineStatus.critical_percentage, label: "Critical" ,indexLabel: this.abnormalMachineStatus.critical_percentage.toString(),},
            
            { y: this.abnormalMachineStatus.warning_percentage, label: "Warning" ,indexLabel: this.abnormalMachineStatus.warning_percentage.toString(),},
          
            { y: this.abnormalMachineStatus.normal_percentage, label: "Normal" ,indexLabel: this.abnormalMachineStatus.normal_percentage.toString(),},  
          ],
          
        });  
        axisY2 = {
          maximum: 100,
          minimum: 0,
        };

      }else{
        data.push({
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          yValueFormatString: "#,##0\"%\"",
          showInLegend: false,  
          indexLabelPlacement: "inside",   
          dataPoints: [
            { y: this.abnormalMachineStatus.stopped, label: "Stopped" ,indexLabel: this.abnormalMachineStatus.stopped.toString()+"%",},
            { y: this.abnormalMachineStatus.idle, label: "Idle" ,indexLabel: this.abnormalMachineStatus.idle.toString()+"%",},
            { y: this.abnormalMachineStatus.running, label: "Running" ,indexLabel: this.abnormalMachineStatus.running.toString()+"%",},
            ],
          
        });

        axisY2 = {
          maximum: 100,
          minimum: 0,
          suffix: "%",
        };
      } 

      var abnormalChart = new CanvasJS.Chart("abnormalDiagnosechart", {
        colorSet: "mintoShades",
        animationEnabled: true, 
        exportEnabled: true,
        title:{
          text:this.getAbnormalFreqLabel(),
          fontSize: 20,
          fontWeight: "lighter",
        },
        axisX:{
          interval: 1
        },
        axisY: {
          suffix: "%",
        },
        axisY2,        
        data

      });

      abnormalChart.render();
    }

  }
 
   
}
