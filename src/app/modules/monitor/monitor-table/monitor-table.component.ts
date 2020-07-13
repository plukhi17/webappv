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

  displayedColumns: string[] = ['name', 'description', 'lastUpdatedTime', 'ratedCurrent', 'avgCurrent', 'avgRiskScore', 'status', 'starts', 'runningPercent', 'idlePercent', 'stoppedPercent', 'fault', 'overloads', 'availabilityStatus'];

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
