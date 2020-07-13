import { Component, EventEmitter, Input, OnInit, Output, OnChanges, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { DataConfig, Machine,DataConfigEx,Frequency ,DataConfigAggregate} from '../../../interfaces';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSelect, MatSnackBar } from '@angular/material';
import { take, tap } from 'rxjs/operators';
import { DataService } from '../../../services/data.service';


@Component({
    selector: 'app-select-date-for-fft-dfft',
    templateUrl: './select-date-for-fft-dfft.component.html',
    styleUrls: ['./select-date-for-fft-dfft.component.scss']
})
export class SelectDateForFftDfftComponent implements OnInit, OnChanges, OnDestroy {
    @Input() config: DataConfig;
    @Output() configEx: EventEmitter<DataConfigEx> = new EventEmitter();
    @Output() configAggregate: EventEmitter<DataConfigAggregate> = new EventEmitter();
  

    public maxDateTime = new Date();
    public formGroup: FormGroup;
    public aggregateNormalTSEx: FormControl = new FormControl();
    public aggregateAbnormalTSEx: FormControl = new FormControl();
    protected destoryed$ = new Subject<boolean>();
    public isAggregateMode: boolean = false;
    public abnormalFreqAggregate: Frequency[];
    public normalFreqAggregate: Frequency[];
    

    @ViewChild('normalTSEx') selectNormalMachine: MatSelect;
    @ViewChild('abnormalTSEx') selectAbNormalMachine: MatSelect;

 
    constructor(private dataService: DataService,private snackBar: MatSnackBar) {
        this._initialiseFormGroup();       
    }
   

    get f() {
        return this.formGroup.controls;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
      
    }
  
    /**
     * Sets a default date if not selected.
     *
     * @param event: Object
     */
    syncTimestamp(event, type): void {
        if (type === 'normal') {
            this.f.normalTSEx.setValue(event.value);
        } else if (type === 'abnormal') {
            this.f.abnormalTSEx.setValue(event.value);
        }   
        else if (type === 'aggregateNormal') {
            this.f.aggregateNormalTSEx.setValue(event.value);
        }  
        else {
            this.f.aggregateAbnormalTSEx.setValue(event.value);
        }      
    }

  
    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            normalTSEx: new FormControl(null), 
            abnormalTSEx: new FormControl(null),
            aggregateNormalTSEx: new FormControl(null), 
            aggregateAbnormalTSEx: new FormControl(null) ,
        });
    }

    resetForm() {
        this.formGroup.reset();
      
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.destoryed$.next(true);
        this.destoryed$.complete();
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }     

    checkAggregatevalue(event){        
        this.isAggregateMode = event.checked;
     }

    loadData(): void {
        // if (this.formGroup.invalid) {
        //     return;
        // }

        const normalMachineSelected = this.config.normal;
        const normalTSSelected = this.f.normalTSEx.value;
        const abNormalMachineSelected = this.config.abnormal;
        const abNormalTSSelected = this.f.abnormalTSEx.value;

        // Check pair of normal machine and time or abnormal machine and time are selected or not
        if ((!abNormalMachineSelected && !abNormalTSSelected) && (!normalMachineSelected && !normalTSSelected)) {
            this.openSnackBar('Please select atleast one pair of machine and time.', 'Close');
            return;
        } else {
            // Check abNormal machine and abNormal time is selected or not
            if (abNormalMachineSelected && !abNormalTSSelected) {
                this.openSnackBar('AbNormal time is required.', 'Close');
                return;
            } else if (!abNormalMachineSelected && abNormalTSSelected) {
                this.openSnackBar('AbNormal machine is required.', 'Close');
                return;
            }
            
            // Check normal machine and normal time is selected or not
            if (normalMachineSelected && !normalTSSelected) {
                this.openSnackBar('Normal time is required.', 'Close');
                return;
            } else if (!normalMachineSelected && normalTSSelected) {
                this.openSnackBar('Normal machine is required.', 'Close');
                return;
            }
            
            if (normalMachineSelected && normalTSSelected && (abNormalMachineSelected || abNormalTSSelected)) {
                if (!abNormalTSSelected) {
                    this.openSnackBar('AbNormal time is required.', 'Close');
                    return;
                } else if (!abNormalMachineSelected) {
                    this.openSnackBar('AbNormal machine is required.', 'Close');
                    return;
                }
            } else if (abNormalMachineSelected && abNormalTSSelected && (normalMachineSelected || normalTSSelected)) {
                if (!normalTSSelected) {
                    this.openSnackBar('Normal time is required.', 'Close');
                    return;
                } else if (!normalMachineSelected) {
                    this.openSnackBar('Normal machine is required.', 'Close');
                    return;
                }
            }
        }
        console.log('select-date-for-fft-dfft.component::loadData() ' + 'calling configEx.emit()');
        console.log(this.configEx);
        
        this.configEx.emit({ 
            normalTS: this.f.normalTSEx.value && this.f.normalTSEx.value._d.getTime(),
            normalDate: this.f.normalTSEx.value && this.f.normalTSEx.value._d,
      
            abnormalTS: this.f.abnormalTSEx.value && this.f.abnormalTSEx.value._d.getTime(),
            abnormalDate: this.f.abnormalTSEx.value && this.f.abnormalTSEx.value._d,

            normalAggregateTS: this.f.aggregateNormalTSEx.value && this.f.aggregateNormalTSEx.value._d.getTime(),
            normalAggregateDate: this.f.aggregateNormalTSEx.value && this.f.aggregateNormalTSEx.value._d,
      
            abnormalAggregateTS: this.f.aggregateAbnormalTSEx.value && this.f.aggregateAbnormalTSEx.value._d.getTime(),
            abnormalAggregateDate: this.f.aggregateAbnormalTSEx.value && this.f.aggregateAbnormalTSEx.value._d,

            isAggregateMode:this.isAggregateMode,
            
        });             
     

  
    }

}
