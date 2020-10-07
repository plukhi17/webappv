import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CHART } from 'src/app/constants/chart.constant';

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

  displayedColumns: string[] = ['name', 'description', 'equipment_type', 'telemetry_time', 'availabilty_status','running_in_hrs' ,'idle_time_in_hrs', 'rated_current', 'i_rms', 'instant_power', 'health_status', 'warning_count', 'riskscore', 'avg_riskscore' ,'fault', 'device_status'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  availabilityColors = CHART.AVAILABILITY_STATUS;
  healthStatusColors = CHART.HEALTH_STATUS;
  riskscoreColors = CHART.RISKSCORE;
  instantCurrentColors = CHART.INSTANT_CURRENT;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
    this.dataSource.sort = this.sort;
  }

  setTableData(): void {
    this.dataSource.data = this.data;
  }

}
