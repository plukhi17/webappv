import {Machine} from './machine.interface';


export interface DataConfig {
    normal: Machine;
    normalTS: number;
    normalDate: string;

    normalTS_To: number;
    normalDate_To: string;

    abnormal: Machine;
    abnormalTS: number;    
    abnormalDate: string;

    abnormalTS_To: number;    
    abnormalDate_To: string;
};

export interface DataConfigEx{
  
    normalTS: number;
    normalDate: string;
 
    abnormalTS: number;    
    abnormalDate: string;
    
    normalAggregateTS: number;
    normalAggregateDate: string;
 
    abnormalAggregateTS: number;    
    abnormalAggregateDate: string;

    isAggregateMode:boolean;

};

export interface DataConfigAggregate {
    graphMode: string;

    normalTS: number;
    normalDate: string; 
    
    abnormalTS: number;
    abnormalDate: string;
};
export interface MachineStatusAvailabilityData {
    normal_percentage:number;
    warning_percentage:number;
    critical_percentage:number;
    running:number;
    idle:number;
    stopped:number;
};
