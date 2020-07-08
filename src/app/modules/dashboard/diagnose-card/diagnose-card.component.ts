import {Component,EventEmitter, Input,Output, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataConfig, Frequency, Machine, MachineFault, MachineStatusAvailabilityData} from '../../../interfaces';
import {take, tap} from 'rxjs/operators';
import {DataService} from '../../../services/data.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { config } from 'process';

@Component({
    selector: 'app-diagnose-card',
    templateUrl: './diagnose-card.component.html',
    styleUrls: ['./diagnose-card.component.scss']
})
export class DiagnoseCardComponent implements OnChanges, OnInit {

    @Input() config: DataConfig;
    
    public normalMachineStatus:MachineStatusAvailabilityData;
    public abnormalMachineStatus:MachineStatusAvailabilityData;
    public changeStatus:boolean = false;
    public loadingState = {
        normal: true,
        abNormal: true,
    };

    constructor(private dataService: DataService) {}
    

    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            this.loadData(this.config);
        }
    }

    setMetric(event: any): void {
         // Option 1 = Health , Option 2  = Status; 
         if(event == 1){ this.changeStatus = false; }else{ this.changeStatus = true; }         
    }   
    
    private loadData(event: any): void {
        if (!event) {
            return;
        }
        console.log('loading machine status data'); 
        if (event.normal) {
            this.loadingState.normal = true;
            this.dataService.fetchMachineStatusAndAvailability(event.normal, event.normalTS, event.normalTS_To).pipe(
                tap((mStaus:MachineStatusAvailabilityData) =>{  
                    this.loadingState.normal = false;
                    this.normalMachineStatus = mStaus;
                
                }),
                take(1)
            ).subscribe();    
        }  
         

        if (event.abnormal) {
            this.loadingState.abNormal = true;
            this.dataService.fetchMachineStatusAndAvailability(event.abnormal, event.abnormalTS,event.abnormalTS_To).pipe(
                tap((mStaus:MachineStatusAvailabilityData) =>{  
                    this.loadingState.abNormal = false;
                    this.abnormalMachineStatus = mStaus;
                }),
                take(1)
            ).subscribe();    
        } 
        
    }
     
}
