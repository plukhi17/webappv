import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataConfig, DataPoint, IrmsFrequency} from '../../../interfaces';
import {DataService} from '../../../services/data.service';
import {map, take, tap} from 'rxjs/operators';
import * as moment from 'moment';


@Component({
    selector: 'app-irms-card',
    templateUrl: './irms-card.component.html',
    styleUrls: ['./irms-card.component.scss']
})
export class IrmsCardComponent implements OnChanges, OnInit {

    @Input() config: DataConfig;

    public normalData: DataPoint[];
    public abnormalData: DataPoint[];
    public loadingState = {
            normal: true,
            abNormal: true,
    };

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            this._fetchIrmsData();
        }
    }

    private _fetchIrmsData(): void {
        this.normalData = [];
        this.abnormalData = [];
        if (this.config.normal) {
            this.loadingState.normal = true;
            this.dataService.fetchIrmsFrequencies(this.config.normal, this.config.normalTS).pipe(
                map((irms: IrmsFrequency[]) => IrmsCardComponent._parseIrmsToDataPoint(irms)),
                tap((data: DataPoint[]) => {
                    // console.log('normalFreq', data);
                    this.loadingState.normal = false;
                    this.normalData = data
                }),
                take(1)
            ).subscribe();
        }

        if (this.config.abnormal) {
            this.loadingState.abNormal = true;
            this.dataService.fetchIrmsFrequencies(this.config.abnormal, this.config.abnormalTS).pipe(
                map((irms: IrmsFrequency[]) => IrmsCardComponent._parseIrmsToDataPoint(irms)),
                tap((data: DataPoint[]) => {
                    // console.log('abnormalFreq', data);
                    this.loadingState.abNormal = false;
                    this.abnormalData = data
                }),
                take(1)
            ).subscribe();
        }
    }

    static _parseIrmsToDataPoint(irms: IrmsFrequency[]): DataPoint[] {
        return irms.map((f: IrmsFrequency) => {
            const date = moment(f.telemetry_time, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
            const dateObj = new Date(date.utc().year(), date.utc().month(), date.utc().date(), date.utc().hours(), date.utc().minutes());
            // console.log('dateObj', dateObj, f.telemetry_time);
            return {
                x: dateObj,
                y: f.i_rms
            };
        });
    }
}
