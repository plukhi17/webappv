import {MachineFault} from './machine-fault.interface';


export interface Machine {
    id: string;
    name: string;
    description?: string;
    faults_and_frequencies: MachineFault[];
    frequency_resolution: number;
}
