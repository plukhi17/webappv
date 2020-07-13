import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataConfig, DataConfigEx, Frequency, Machine, MachineFault } from '../../../interfaces';
import { take, tap } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { bool } from 'aws-sdk/clients/signer';

@Component({
    selector: 'app-dfft-card',
    templateUrl: './dfft-card.component.html',
    styleUrls: ['./dfft-card.component.scss']
})
export class DfftCardComponent implements OnChanges, OnInit {

    @Input() config: DataConfig;
    @Input() configEx: DataConfigEx;

    public custFreqEnabled: boolean;
    public custMultiEnabled: boolean;
    public customFreq: string;
    public customMultiFreq: number;

    public abnormalFreq: Frequency[];
    public normalFreq: Frequency[];
    public selectedOrder = "aces";

    public machineFaultPair: { machine: Machine, fault: MachineFault }[];

    // Aggregate section related....
    public selectedFault: MachineFault;
    public graphMode: string = 'instance'; // This is default graph mode when DFFT is loaded.
    public isAggregateMode: boolean = false;


    public abnormalFreqAggregate: Frequency[];
    public normalFreqAggregate: Frequency[];

    public formGroupDfft: FormGroup;
    // boolShowAggregate = false;

    // End of aggregate section
    public isInstanceDataLoaded:bool = false;
    public isAggregateDataLoaded:bool = false;


    public loadingState = {
        normal: true,
        abNormal: true,
    };

    constructor(private dataService: DataService) {

        this._initialiseFormGroup();
    }

    ngOnInit() {
    }
    get f() {
        return this.formGroupDfft.controls;
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log('dfft-card-component::ngOnChanges() ' + 'received event');
        console.log(changes);
        if (this.config && this.config.normal && changes.configEx && changes.configEx.currentValue) {
            this._processMovingParts(this.config);
            this._fetchFrequencies(this.config, this.configEx);
        }

    }
    private _initialiseFormGroup(): void {
        this.formGroupDfft = new FormGroup({
            dfftAggregateTSNormal: new FormControl(null),
            dfftAggregateTSAbNormal: new FormControl(null)
        });
    }
    /**
     * Set vertical lines in chart based on selected machine-fault.
     *
     * @param event
     */
    setFaultFrequency(event: { machine: Machine, fault: MachineFault }): void {
        if (!event) {
            return;
        }
        this.selectedFault = {
            ...event.fault,
            // fault_frequencies: event.fault.fault_frequencies.map((v: number) => v * event.machine.frequency_resolution)
            fault_frequencies: event.fault.fault_frequencies
        };
    }

    /**
     * Set Graph mode.. This is to switch between instance and aggregate.
     *
     * @param event
     */
    setGraphMode(event: any): void {
        console.log(event.value);
        this.graphMode = event.value;
        if (this.graphMode == 'instance') { this.isAggregateMode = false; }
        else { this.isAggregateMode = true; }

        if (!event) {
            return;
        }

    }
    private loadData(event: any): void {
        if (!event) {
            return;
        }
        console.log('dfft-card.component.loadData() - Load data called in dfft..');
        // console.log('graph mode:', this.graphMode);
        // console.log('Normal date selected:',this.f.dfftAggregateTSNormal.value._d.getTime());
        // console.log('Abnormal date selected:',this.f.dfftAggregateTSAbNormal.value._d.getTime();
        if (this.graphMode == 'instance') {
            this.normalFreqAggregate.splice(0, this.normalFreqAggregate.length);
            this.abnormalFreqAggregate.splice(0, this.abnormalFreqAggregate.length);
            this.isAggregateMode = false;

            this._fetchFrequencies(this.config, this.configEx);
        }
        else {
            this.isAggregateMode = true;
            this._fetchFrequenciesAggregate(this.config, this.f.dfftAggregateTSNormal.value._d.getTime())
        }


    }
    setDfftAggregateDate(event: any, type: string): void {
        console.log('date value set - ', event.value);
        if (type == 'normal') {
            this.f.dfftAggregateTSNormal.setValue(event.value);
        }else {
            this.f.dfftAggregateTSAbNormal.setValue(event.value);
        }


    }
    setCustomFreq(): void {
        this.selectedFault = {
            fault_id: -1,
            fault_name: 'Custom',
            fault_frequencies: this.customFreq.split(',').map((s) => +s.trim())
        };
    }

    setCustomMultiFreq(): void {
        this.selectedFault = this.dataService.customMultiplesFrequency(this.customMultiFreq);
    }

    setSortedFrequency(event) {
        this.selectedOrder = event;
    }

    /**
     * Fetch frequencies for normal and abnormal machines.
     *
     * @param config
     * @private
     */
    private _fetchFrequencies(config: DataConfig, configEx: DataConfigEx): void {

        this.abnormalFreq = [];
        this.normalFreq = [];
        console.log('in dfft-card-component::_fetchFrequencies()...', config,configEx);
        /* Fetch frequencies for normal machine. */
        if (config.normal) {
            this.loadingState.normal = true;
            this.dataService.fetchFrequencies(config.normal, configEx.normalTS).pipe(
                tap((freq: Frequency[]) => {
                    this.loadingState.normal = false;
                    // console.log('normalFreq', freq);
                    this.normalFreq = freq
                }),
                take(1)
            ).subscribe();
        }

        if (config.abnormal) {
            this.loadingState.abNormal = true;
            /* Fetch frequencies for abnormal machine. */
            this.dataService.fetchFrequencies(config.abnormal, configEx.abnormalTS).pipe(
                tap((freq: Frequency[]) => {
                    this.loadingState.abNormal = false;
                    // console.log('abnormalFreq', freq);
                    this.abnormalFreq = freq
                }),
                take(1)
            ).subscribe();
        }
        
    }


    /**
    * Fetch aggregated dfft for normal and abnormal machines.
    *
    * @param config
    * @private
    */
    private _fetchFrequenciesAggregate(config: DataConfig, aggregateTS: number): void {

        this.abnormalFreqAggregate = [];
        this.normalFreqAggregate = [];
        console.log('_fetchFrequenciesAggregate called...');
        /* Fetch frequencies for normal machine. */
        if (config.normal) {
            this.loadingState.normal = true;
            this.dataService.fetchFrequenciesAggregate(config.normal, aggregateTS).pipe(
                tap((freq: Frequency[]) => {
                    this.loadingState.normal = false;
                    // console.log('normalFreq', freq);
                    this.normalFreqAggregate = freq
                    console.log('normal Aggregate data fetched,', this.normalFreqAggregate);
                }),
                take(1)
            ).subscribe();
        }

        if (config.abnormal) {
            this.loadingState.abNormal = true;
            /* Fetch frequencies for abnormal machine. */
            this.dataService.fetchFrequenciesAggregate(config.abnormal, aggregateTS).pipe(
                tap((freq: Frequency[]) => {
                    this.loadingState.abNormal = false;
                    // console.log('abnormalFreq', freq);
                    this.abnormalFreqAggregate = freq
                    console.log('Abnormal Aggregate data fetched,', this.abnormalFreqAggregate);
                }),
                take(1)
            ).subscribe();
        }
    }



    /**
     * Combine moving parts from Normal and Abnormal machines into a single list.
     *
     * @param config
     * @private
     */
    private _processMovingParts(config: DataConfig): void {
        console.log('in dfft-card-component::_processMovingParts()...', config);
        const pairs = [];
        if (this.config.normal && this.config.normalTS) {
            pairs.push(...this.config.normal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.normal,
                    fault: flt
                };
            }));
        }
        if (this.config.abnormal
            && this.config.abnormalTS
            && ((this.config.abnormal !== this.config.normal) || (!this.config.normal && !this.config.normalTS))) {
            pairs.push(...this.config.abnormal.faults_and_frequencies.map((flt: MachineFault) => {
                return {
                    machine: this.config.abnormal,
                    fault: flt
                };
            }));
        }
        this.machineFaultPair = pairs;
    }
}
