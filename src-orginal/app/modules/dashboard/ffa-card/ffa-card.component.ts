import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { AvgFrequency, DataConfig, DataPoint, FfaFrequency } from '../../../interfaces';
import { map, take, tap } from 'rxjs/operators';
import { MatButtonToggleChange, MatSnackBar } from '@angular/material';
import * as moment from 'moment';


@Component({
    selector: 'app-ffa-card',
    templateUrl: './ffa-card.component.html',
    styleUrls: ['./ffa-card.component.scss']
})


export class FfaCardComponent implements OnInit, OnChanges {

    @Input() config: DataConfig;

    public normalData: DataPoint[];
    public abnormalData: DataPoint[];
    public formValid = false;
    public formGroup: FormGroup;
    public disableFfaLoadbtn = true;
    public loadingState = {
        normal: false,
        abNormal: false,
    };
    public timeRanges = [
        {
            name: 'Last 7 days',
            id: 7
        },
        {
            name: 'Last 15 days',
            id: 15
        },
        {
            name: 'Last One Month',
            id: 30
        },
        {
            name: 'Last Two Months',
            id: 60
        },
        {
            name: 'Last Three Months',
            id: 90
        }
    ];

    public selectedTimeRange = 15;
    public configOption = 15;
    public normal = {
        from_date: '',
        to_date: ''
    }
    public abnormal = {
        from_date: '',
        to_date: ''
    }
    selectedFault: any;
    public maintenanceDate = {
        normalDates: [],
        abnormalDates: []
    }
    constructor(
        private dataService: DataService,
        private snackBar: MatSnackBar
    ) {
        this._initialiseFormGroup();
    }

    ngOnInit() { }

    private getFromDates() {
        this.normal.to_date = moment(this.config.normalDate).format('YYYY-MM-DD HH:mm:ss');
        this.abnormal.to_date = moment(this.config.abnormalDate).format('YYYY-MM-DD HH:mm:ss');
        this.normal.from_date = moment(this.config.normalDate).subtract(this.selectedTimeRange, 'days').format('YYYY-MM-DD HH:mm:ss');
        this.abnormal.from_date = moment(this.config.abnormalDate).subtract(this.selectedTimeRange, 'days').format('YYYY-MM-DD HH:mm:ss');
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.config && changes.config.currentValue) {
            this.disableFfaLoadbtn = false;

            // if (this.formGroup.valid) {
            //     this._fetchFrequencies();
            // }
            if (this.formValid) {
                this._fetchFrequencies();
            }
        }
        if (!changes.config.currentValue && !changes.config.firstChange) {
            this.disableFfaLoadbtn = true;
        }
    }
    /**
     * API call to load average frequency data.
     */
    public loadAvgFreq(): void {
        if (this.formGroup.invalid) {
            return;
        }

        if (this.config) {
            this._fetchFrequencies();
            this._fetchMaintenanceDate();
        }

    }

    private _fetchFrequencies(): void {
        this.getFromDates();

        this.normalData = [];
        this.abnormalData = [];
        /* Fetch frequencies for normal machine. */
        if (this.config.normal) {
            if (this.f.normal_from.value && this.f.normal_to.value) {
                this.loadingState.normal = true;
                this.dataService.fetchAvgFaultFrequencies(this.config.normal, this.f.normal_from.value, this.f.normal_to.value, this.normal.from_date, this.normal.to_date).pipe(
                    map((avgFreq: any) => {
                        this.configOption = avgFreq.options;
                        return FfaCardComponent._parseAvgFreqToDataPoint(avgFreq.data);
                    }),
                    tap((data: DataPoint[]) => {
                        this.normalData = data;
                        this.loadingState.normal = false;
                        if (!this.f.abnormal_from.value || !this.f.abnormal_to.value) {
                            this.loadingState.abNormal = false;
                        }
                    }),
                    take(1)
                ).subscribe();
            }
        }

        if (this.config.abnormal) {
            if (this.f.abnormal_from.value && this.f.abnormal_to.value) {
                this.loadingState.abNormal = true;
                this.dataService.fetchAvgFaultFrequencies(this.config.abnormal, this.f.abnormal_from.value, this.f.abnormal_to.value, this.abnormal.from_date, this.abnormal.to_date).pipe(
                    // map((avgFreq: FfaFrequency[]) => {
                    map((avgFreq: any) => {
                        this.configOption = avgFreq.options;
                        return FfaCardComponent._parseAvgFreqToDataPoint(avgFreq.data);
                    }),
                    tap((data: DataPoint[]) => {
                        // console.log('abnormalFreq', data);
                        this.abnormalData = data;
                        this.loadingState.abNormal = false;
                        if (!this.f.normal_from.value || !this.f.normal_to.value) {
                            this.loadingState.normal = false;
                        }
                    }),
                    take(1)
                ).subscribe();
            }
        }
    }

    private _fetchMaintenanceDate(): void {
        this.getFromDates();
        // let normalDates;
        // let abnormalDates;
        if (this.config.normal) {
            if (this.normal.from_date && this.normal.to_date && this.f.normal_from.value && this.f.normal_to.value) {
                this.loadingState.normal = true;
                this.dataService.fetchMaintenanceDates(this.config.normal, this.normal.from_date, this.normal.to_date).subscribe((resp) => {
                    // console.log('resp', resp);
                    this.maintenanceDate.normalDates = resp;
                    // this.loadingState.normal = false;
                });
            }
            // else {
            //     if (this.f.normal_from.value && this.f.normal_to.value && !this.config.normal) {
            //         this.openSnackBar('Please select normal frequency to load the data.', 'Close');
            //     }
            // }
        }
        // else if (!this.config.abnormal) {
        //     this.openSnackBar('Please select normal machine.', 'Close');
        // }

        if (this.config.abnormal) {
            if (this.abnormal.from_date && this.abnormal.to_date && this.f.abnormal_from.value && this.f.abnormal_to.value) {
                this.loadingState.abNormal = true;
                this.dataService.fetchMaintenanceDates(this.config.abnormal, this.abnormal.from_date, this.abnormal.to_date).subscribe((resp) => {
                    // console.log('resp', resp);
                    this.maintenanceDate.abnormalDates = resp;
                    // this.loadingState.abNormal = false;
                });
            }
            // else {
            //     if (this.f.abnormal_from.value && this.f.abnormal_to.value && !this.config.abnormal) {
            //         this.openSnackBar('Please select abNormal machine.', 'Close');
            //     }
            // }
        }
        // else if (!this.config.normal) {
        //     this.openSnackBar('Please select abNormal machine.', 'Close');
        // }

        // this.maintenanceDate.normalDates = normalDates;
        // this.maintenanceDate.abnormalDates = abnormalDates
    }

    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            normal_from: new FormControl(null),
            normal_to: new FormControl(null),
            abnormal_from: new FormControl(null),
            abnormal_to: new FormControl(null)
        });
    }

    public onInputChange(value) {
        if ((this.f.normal_from.value && this.f.normal_to.value) || (this.f.abnormal_from.value && this.f.abnormal_to.value)) {
            this.formValid = true;
        } else {
            this.formValid = false;
        }
    }

    get f() {
        return this.formGroup.controls;
    }

    public onRangeSelection(event: MatButtonToggleChange) {
        this.selectedTimeRange = event.value;
        // if (this.formGroup.valid) this._fetchFrequencies();
        if (this.formValid) {
            this._fetchFrequencies();
            this._fetchMaintenanceDate();
        }
    }

    static _parseAvgFreqToDataPoint(avgFreq: FfaFrequency[]): DataPoint[] {
        return avgFreq.map((f: FfaFrequency) => {
            return {
                x: new Date(f.telemetry_time_utc),
                y: parseFloat(f.max_value),
                y2: parseFloat(f.max_index_value_new),
                y3: parseFloat(f.i_rms),
                y4: parseFloat(f.riskscore)
            };
        });
    }
}
