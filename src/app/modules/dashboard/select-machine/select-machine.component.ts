import { Component, EventEmitter, Input, OnInit, Output, OnChanges, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { DataConfig, Machine } from '../../../interfaces';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSelect, MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-select-machine',
    templateUrl: './select-machine.component.html',
    styleUrls: ['./select-machine.component.scss']
})
export class SelectMachineComponent implements OnInit, OnChanges, OnDestroy {

    @Input() machines: Machine[];
    @Output() config: EventEmitter<DataConfig> = new EventEmitter();
    public maxDateTime = new Date();

    public formGroup: FormGroup;
    public searchNormalMachine: FormControl = new FormControl();
    public searchAbNormalMachine: FormControl = new FormControl();
    public filteredNormalMachines: Machine[] = [];
    public filteredAbnormalMachines: Machine[] = [];
    protected destoryed$ = new Subject<boolean>();

    @ViewChild('selectNormalMachine') selectNormalMachine: MatSelect;
    @ViewChild('selectAbNormalMachine') selectAbNormalMachine: MatSelect;


    constructor(private snackBar: MatSnackBar) {
        this._initialiseFormGroup();
        this._setSelectFilters();
    }

    get f() {
        return this.formGroup.controls;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.machines && changes.machines.currentValue) {
            this.setMachines();
        }
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    setMachines() {
        if (!this.searchNormalMachine.value) {
            this.filteredNormalMachines = this.machines.slice();
        }

        if (!this.searchAbNormalMachine.value) {
            this.filteredAbnormalMachines = this.machines.slice();
        }
    }

    compareWith(prev: Machine, next: Machine) {
        return prev && next && prev.id === next.id;
    }

    /**
     * Converts form values into data-config object and emit back to parent component.
     */
    loadData(): void {
        // if (this.formGroup.invalid) {
        //     return;
        // }

        const normalMachineSelected = this.f.normalMachine.value;
        const normalTSSelected = this.f.normalTS.value;
        const abNormalMachineSelected = this.f.abnormalMachine.value;
        let abNormalTSSelected = this.f.abnormalTS.value;

        // Check pair of normal machine and time or abnormal machine and time are selected or not
        if ((!abNormalMachineSelected && !abNormalTSSelected) && (!normalMachineSelected && !normalTSSelected)) {
            this.openSnackBar('Please select atleast one pair of machine and time.', 'Close');
            return;
        } else {
    

            // Check abNormal machine and abNormal time is selected or not
            if (abNormalMachineSelected && !abNormalTSSelected) {
                this.openSnackBar('AbNormal time is required.', 'Close');
                return;
            } else if (abNormalMachineSelected && abNormalTSSelected) {
                if (!Array.isArray(abNormalTSSelected) || abNormalTSSelected.length !== 2) {
                    this.openSnackBar('AbNormal time is required.', 'Close');
                    return;
                }else if(abNormalTSSelected[0] == null || abNormalTSSelected[1] === null ){

                    this.openSnackBar('AbNormal time is required.', 'Close');
                    return;
                }
                
            } else if (!abNormalMachineSelected && abNormalTSSelected) {
                this.openSnackBar('AbNormal machine is required.', 'Close');
                return;
            }
            
            // Check normal machine and normal time is selected or not
            if (normalMachineSelected && !normalTSSelected) {
                this.openSnackBar('Normal time is required.', 'Close');
                return;
            } else if (normalMachineSelected && normalTSSelected) {
                if (!Array.isArray(normalTSSelected) || normalTSSelected.length !== 2) {
                    this.openSnackBar('Normal time is required.', 'Close');
                    return;
                }else if(normalTSSelected[0] == null || normalTSSelected[1] === null ){

                    this.openSnackBar('Normal time is required.', 'Close');
                    return;
                }
                
            }else if (!normalMachineSelected && normalTSSelected) {
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
            
            if(abNormalTSSelected === null){
                abNormalTSSelected = [];
            }
        }

        this.config.emit({
      
            normal: this.f.normalMachine.value && this.f.normalMachine.value,
            normalTS: this.f.normalTS.value[0] && this.f.normalTS.value[0]._d.getTime(),
            normalDate: this.f.normalTS.value[0] && this.f.normalTS.value[0]._d,
            // Noraml To Data
            normalTS_To: this.f.normalTS.value[1] && this.f.normalTS.value[1]._d.getTime(),
            normalDate_To: this.f.normalTS.value[1] && this.f.normalTS.value[1]._d,

            abnormal: this.f.abnormalMachine.value && this.f.abnormalMachine.value,
            abnormalTS: abNormalTSSelected[0] && abNormalTSSelected[0]._d.getTime(),
            abnormalDate: abNormalTSSelected[0] && abNormalTSSelected[0]._d,

            abnormalTS_To: abNormalTSSelected[1] && abNormalTSSelected[1]._d.getTime(),
            abnormalDate_To: abNormalTSSelected[1] && abNormalTSSelected[1]._d
        });
    }

    /**
     * Sets a default date if not selected.
     *
     * @param event: Object
     */
    syncTimestamp(event, type): void {
        if (type === 'normal') {
            this.f.normalTS.setValue(event.value);
        }  else if (type === 'normal_To') {
            this.f.normalTS_To.setValue(event.value);
        } else if (type === 'abnormal_To') {
            this.f.abnormalTS_To.setValue(event.value);
        }else {
            this.f.abnormalTS.setValue(event.value);
        }
        // for (const fc of [this.f.normalTS, this.f.abnormalTS]) {
        //     if (!fc.value) {
        //         fc.setValue(event.value);
        //     }
        // }
    }

    private _setSelectFilters() {
        this.searchNormalMachine
            .valueChanges
            .pipe(
                takeUntil(this.destoryed$)
            ).subscribe(
                (value) => {
                    this.filterMachines(value, 'normal');
                }
            );

        this.searchAbNormalMachine
            .valueChanges
            .pipe(
                takeUntil(this.destoryed$)
            ).subscribe(
                (value) => {
                    this.filterMachines(value, 'abNormal');
                }
            );
    }

    private filterMachines(value: string, type: string) {
        if (!this.machines || !this.machines.length) {
            return;
        }

        switch (type) {
            case 'normal':
                if (!value || !value.trim) {
                    this.filteredNormalMachines = this.machines.slice();
                    return;
                } else {
                    value = value.toLowerCase();
                }
                // filter normal machines
                this.filteredNormalMachines = this.machines.filter(machine => machine.name.toLowerCase().indexOf(value) > -1);
                break;


            case 'abNormal':
                if (!value || !value.trim) {
                    this.filteredAbnormalMachines = this.machines.slice();
                    return;
                } else {
                    value = value.toLowerCase();
                }
                // filter ab-normal machines
                this.filteredAbnormalMachines = this.machines.filter(machine => machine.name.toLowerCase().indexOf(value) > -1);
                break;
        }
    }

    private _initialiseFormGroup(): void {
        this.formGroup = new FormGroup({
            normalMachine: new FormControl(null),
            normalTS: new FormControl(null),
            normalTS_To: new FormControl(null),
            abnormalMachine: new FormControl(null),
            abnormalTS: new FormControl(null),
            abnormalTS_To: new FormControl(null)
        });
    }

    resetForm() {
        this.formGroup.reset();
        this.config.emit();
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.destoryed$.next(true);
        this.destoryed$.complete();
    }

    static alteastOneMachine(AC: AbstractControl) {
        const get = (key: string) => {
            return AC.get(key).value;
        };

        const normalMachineSelected = get('normalMachine');
        const normalTSSelected = get('normalTS');
        const abNormalMachineSelected = get('abnormalMachine');
        const abNormalTSSelected = get('abnormalTS');

        // Check that both normal machine and abNormal machine are not selected
        if (!normalMachineSelected && !abNormalMachineSelected) {
            AC.get('normalMachine').setErrors({ required: true });
        }
        // Check normal machine and normal time is selected or not
        if (normalMachineSelected && normalTSSelected) {
            AC.get('normalMachine').setErrors(null);
            AC.get('normalTS').setErrors(null);
        } else {
            if (normalMachineSelected) {
                AC.get('normalTS').setErrors({ required: true });
            } else {
                AC.get('normalMachine').setErrors({ required: true });
            }
        }

        // Check abNormal machine and abNormal time is selected or not
        if (abNormalMachineSelected && abNormalTSSelected) {
            AC.get('abnormalMachine').setErrors(null);
            AC.get('abnormalTS').setErrors(null);
        } else {
            if (abNormalMachineSelected) {
                AC.get('abnormalTS').setErrors({ required: true });
            } else {
                AC.get('abnormalMachine').setErrors({ required: true });
            }
        }
        // if ((get('normalMachine') && get('normalTS')) ||
        //     (get('abnormalMachine') && get('abnormalTS'))) {
        //     AC.get('abnormalMachine').setErrors(null);
        //     AC.get('normalMachine').setErrors(null);
        // } else if (get('normalMachine') && get('normalTS')) {
        //     AC.get('abnormalMachine').setErrors({ required: true });
        // } else {
        //     AC.get('normalMachine').setErrors({ required: true });
        // }
        return null;
    }
}
