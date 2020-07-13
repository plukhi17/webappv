import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvgFrequency, Frequency, IrmsFrequency, Machine, MachineFault, RawFrequency, FfaFrequency, MachineStatusAvailabilityData } from '../interfaces';
import { environment } from '../../environments/environment';
import { EndpointConstant, StorageConstant } from '../constants';
import { map } from 'rxjs/operators';
import { DatetimeUtil } from '../utils/datetime.util';
import { StorageService } from './storage.service';
import { MatSnackBar } from '@angular/material';
import savitzkyGolay from 'ml-savitzky-golay';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    readonly baseUri: string;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
        this.baseUri = environment.baseUri;
    }

    fetchAllMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(`${this.baseUri}/${EndpointConstant.GET_EQUIPMENTS}`);
    }

    fetchFrequencies(machine: Machine, timestamp: number): Observable<Frequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_TRANSFORMED_DATA}?equipment_id=${machine.id}&time_stamp=${timeString}`;

        return this.http.get<RawFrequency>(url).pipe(
            map((rawData: RawFrequency) => {
                const freqs: Frequency[] = [];
                if (rawData.transformedData) {
                    rawData.transformedData.forEach((v: number, i: number) => {
                        freqs.push({
                            /* Udpate frequency with respective factor. */
                            f: rawData.divideValue ? (i / rawData.divideValue) : i,
                            v
                        });
                    });
                } else {
                    console.log('error for fetchFreq', rawData);
                }
                return freqs;
            }),
        );
    }
    fetchFrequenciesAggregate(machine: Machine, timestamp: number): Observable<Frequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_TRANSFORMED_DATA_AGGREGATE}?equipment_id=${machine.id}&time_stamp=${timeString}`;

        return this.http.get<RawFrequency>(url).pipe(
            map((rawData: RawFrequency) => {
                const freqs: Frequency[] = [];
                if (rawData.transformedData) {
                    rawData.transformedData.forEach((v: number, i: number) => {
                        freqs.push({
                            /* Udpate frequency with respective factor. */
                            f: rawData.divideValue ? (i / rawData.divideValue) : i,
                            v
                        });
                    });
                } else {
                    console.log('error for fetchFreq', rawData);
                }

                return freqs;
            }),
        );
    }
    fetchFrequenciesFftAggregate(machine: Machine, timestamp: number): Observable<Frequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_TRANSFORMED_DATA_FFT_AGGREGATE}?equipment_id=${machine.id}&time_stamp=${timeString}`;

        return this.http.get<RawFrequency>(url).pipe(
            map((rawData: RawFrequency) => {
                const freqs: Frequency[] = [];
                if (rawData.transformedData) {
                    rawData.transformedData.forEach((v: number, i: number) => {
                        freqs.push({
                            /* Udpate frequency with respective factor. */
                            f: rawData.divideValue ? (i / rawData.divideValue) : i,
                            v
                        });
                    });
                } else {
                    console.log('error for fetchFFT Aggregate data from server.', rawData);
                }
                return freqs;
            }),
        );
    }

    fetchFrequenciesFft(machine: Machine, timestamp: number): Observable<Frequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_TRANSFORMED_DATA_FFT}?equipment_id=${machine.id}&time_stamp=${timeString}`;

        return this.http.get<RawFrequency>(url).pipe(
            map((rawData: RawFrequency) => {
                const freqs: Frequency[] = [];
                if (rawData.transformedData) {
                    rawData.transformedData.forEach((v: number, i: number) => {
                        freqs.push({
                            /* Udpate frequency with respective factor. */
                            f: rawData.divideValue ? (i / rawData.divideValue) : i,
                            v
                        });
                    });
                } else {
                    console.log('error for fetchFreqFFT', rawData);
                }
                return freqs;
            }),
        );
    }
    fetchMachineStatusAndAvailability(machine: Machine, timestamp: number, timestamp_To: number): Observable<MachineStatusAvailabilityData> {

        const timeStringBeginning: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const timeStringEnd: string = DatetimeUtil.convertTimestampToDateString(timestamp_To);

        const url = `${this.baseUri}/${EndpointConstant.GET_MACHINE_AVAILABILITY_STATUS}?equipment_id=${machine.id}&from_date=${timeStringBeginning}&to_date=${timeStringEnd}`;

        return this.http.get<MachineStatusAvailabilityData>(url).pipe(
            map((machineStatus: any) => {
                return machineStatus;
            }),
        );
    }
    private smoothingData(maxValuesArray, optionsConfig) {
        const options = {
            derivative: parseInt(optionsConfig.derivative),
            windowSize: parseInt(optionsConfig.windowSize)
        };
        const ans = savitzkyGolay(maxValuesArray, 1, options);
        return ans;
    }

    fetchAvgFaultFrequencies(machine: Machine, fromFreq: number, toFreq: number, fromDate: string, toDate: string): Observable<FfaFrequency[]> {
        // const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const params = new HttpParams()
            .append('tenant_id', StorageService.getItem(StorageConstant.TENANT_ID))
            .append('plant_id', StorageService.getItem(StorageConstant.PLANT_ID))
            .append('frequency_resolution', machine.frequency_resolution.toString())
            .append('equipment_id', machine.id)
            .append('from_freq', fromFreq.toString())
            .append('to_freq', toFreq.toString())
            .append('from_date', fromDate)
            .append('to_date', toDate);
        const url = `${this.baseUri}/${EndpointConstant.GET_AVG_FAULT_FREQUENCY}`;
        return this.http.get<{ data: FfaFrequency[], options: { [key: string]: any } }>(url, { params }).pipe(
            map((ffaData: any) => {
                if (ffaData.data && ffaData.data.length > 0) {
                    const smoothingData = [];
                    const maxValuesObject = {};
                    const maxValuesArray = ffaData.data.map(freq => parseInt(freq.max_value, 10));


                    if (maxValuesArray.length) {
                        console.log('maxValueArray', maxValuesArray);
                        const smoothData = this.smoothingData(maxValuesArray, ffaData.options);
                        const difference = maxValuesArray.length - smoothData.length;
                        ffaData.data = ffaData.data.map((freq, index) => {
                            freq.max_index_value_new = (parseInt(freq.max_index_value_new, 10) / machine.frequency_resolution).toString();
                            if (index > difference) {
                                freq.max_value = smoothData[index];
                            }
                            return freq;
                        });
                        console.log('ffaData.data', ffaData.data);
                        // smoothData
                    }
                }
                return ffaData;
            })
        );
    }

    fetchMaintenanceDates(machine: Machine, fromDate: string, toDate: string): Observable<FfaFrequency[]> {
        const params = new HttpParams()
            .append('equipment_id', machine.id)
            .append('from_date', fromDate)
            .append('to_date', toDate);

        const url = `${this.baseUri}/maintenance-dates`;
        return this.http.get<FfaFrequency[]>(url, { params }).pipe(
            map(ffaData => {
                return ffaData;
            })
        );
    }

    fetchIrmsFrequencies(machine: Machine, timestamp: number): Observable<IrmsFrequency[]> {
        const timeString: string = DatetimeUtil.convertTimestampToDateString(timestamp);
        const url = `${this.baseUri}/${EndpointConstant.GET_IRMS_FREQUENCY}?equipment_id=${machine.id}&date=${timeString}`;
        return this.http.get<IrmsFrequency[]>(url);
    }

    postTagData(machine: Machine, fault: MachineFault, fromDate: string, toDate: string): Observable<string> {
        const payload = {
            equipment_id: machine.id,
            tenant_id: StorageService.getItem(StorageConstant.TENANT_ID),
            plant_id: StorageService.getItem(StorageConstant.PLANT_ID),
            fault_id: fault.fault_id,
            from_date: fromDate,
            to_date: toDate,
        };
        return this.http.post<string>(`${this.baseUri}/${EndpointConstant.POST_EQUIPMENT_FAULT_INSTANCES}`, payload);
    }

    customMultiplesFrequency(customMultiFreq: number,) {
        const selectedFaultMultiples = [];
        if (customMultiFreq < 1) {
            this.openSnackBar('Please enter frequency more than 1.', 'Close');
        } else {
            for (let index = 1; index <= 10; index++) {
                selectedFaultMultiples.push(customMultiFreq * index);
            }
            const selectedFault = {
                fault_id: -1,
                fault_name: 'Custom',
                fault_frequencies: selectedFaultMultiples
            };
            return selectedFault;
        }
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    // Monitor Realtime apis
    getRealtimeMetrics(): Observable<any> {
        // return this.http.get(`${this.baseUri}/${EndpointConstant.GET_REALTIME_METRICS}`);
        return this.http.get(`assets/data/realtime_data.json`).pipe(map((data: any) => data ? data.list : data));
    }

    getDaywiseAggregatedData(from?: string, to?: string): Observable<any> {
        // return this.http.get(`${this.baseUri}/${EndpointConstant.GET_REALTIME_METRICS}`);
        return this.http.get(`assets/data/daily_aggregated_data_for_heatmap.json`).pipe(map((data: any) => {
            if (data && data.list) {
                return this.filterDataByDate(data.list, from, to);
            } else {
                data;
            }
        }));
    }

    getHourlyAggregatedData(from?: string, to?: string): Observable<any> {
        // return this.http.get(`${this.baseUri}/${EndpointConstant.GET_REALTIME_METRICS}`);
        return this.http.get(`assets/data/hourly_aggregated_data_for_heatmap.json`).pipe(map((data: any) => {
            if (data && data.list) {
                return this.filterDataByDate(data.list, from, to);
            } else {
                data;
            }
        }));
    }

    getHourlyAggregatedDataForAnalytics(machine: Machine, fromDate: string, toDate: string): Observable<any> {
        const params = new HttpParams()
            .append('equipment_id', machine.id)
            .append('from_date', fromDate)
            .append('to_date', toDate);
        return this.http.get(`${this.baseUri}/${EndpointConstant.GET_HOURLY_AGGREGATED_dATA}`, { params }).pipe(map((data: any) => data ? data.list : null));
    }

    getDailyComboChartDataForAnalytics(): Observable<any> {
        return this.http.get(`assets/data/daily_aggregated_data_for_combochart.json`).pipe(map((data: any) => {
            if (data && data.list) {
                return data.list;
                // return this.filterDataByDate(data.list, from, to);
            } else {
                data;
            }
        }));
    }

    filterDataByDate(data: any[], from?: string, to?: string): any[] {
        const fromTimeStamp = from ? new Date(from).getTime() : null;
        const toTimeStamp = to ? new Date(to).getTime() : null;
        return data.filter((entry) => {
            const entryTimeStamp = new Date(entry.telemetry_time_ist_day).getTime();
            if (fromTimeStamp && toTimeStamp) {
                return entryTimeStamp >= fromTimeStamp && entryTimeStamp <= toTimeStamp;
            } else if (fromTimeStamp) {
                return entryTimeStamp >= fromTimeStamp;
            } else if (toTimeStamp) {
                return entryTimeStamp <= toTimeStamp;
            } else {
                return false;
            }
        });
    }
}
