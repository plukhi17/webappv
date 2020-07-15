import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-monitor-table',
  templateUrl: './monitor-table.component.html',
  styleUrls: ['./monitor-table.component.scss']
})
export class MonitorTableComponent implements OnInit, AfterViewInit {

  private _data: any[] = [];
  @Input('data')
  public get data(): any[] {
    return this._data;
  }
  public set data(value: any[]) {
    this._data = value;
    this.setTableData();
  }

  displayedColumns: string[] = ['name', 'description', 'equipment_type', 'telemetry_time', 'rated_current', 'i_rms', 'riskscore', 'instant_power', 'equipment_status', 'device_status', 'health_status', 'availabilty_status', 'fault'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
  }

  setTableData(): void {
    this.dataSource.data = this.data;
  }

}
