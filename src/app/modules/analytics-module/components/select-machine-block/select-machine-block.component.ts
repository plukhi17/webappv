import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataConfig, Machine } from 'src/app/interfaces';

@Component({
  selector: 'app-select-machine-block',
  templateUrl: './select-machine-block.component.html',
  styleUrls: ['./select-machine-block.component.scss']
})
export class SelectMachineBlockComponent implements OnInit {
  @Input() machines: Machine[];
  @Output() config: EventEmitter<DataConfig | any> = new EventEmitter();
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
    this.config.emit({
      normal: this.f.normalMachine.value && this.f.normalMachine.value,
      fromToDate: this.f.fromToDate.value
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
    } else if (type === 'normal_To') {
      this.f.normalTS_To.setValue(event.value);
    } else if (type === 'abnormal_To') {
      this.f.abnormalTS_To.setValue(event.value);
    } else {
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
      abnormalTS_To: new FormControl(null),
      fromToDate: new FormControl(null)
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

}
