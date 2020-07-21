import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
import { Machine } from 'src/app/interfaces';

@Component({
  selector: 'app-monitor-machine-life-indicator',
  templateUrl: './monitor-machine-life-indicator.component.html',
  styleUrls: ['./monitor-machine-life-indicator.component.scss']
})
export class MonitorMachineLifeIndicatorComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getHourlyPlantLifeValue();
    this.getHourlyMachineLifeValue();
  }

  getHourlyPlantLifeValue(): void {
    this.dataService.getHourlyPlantLifeValue().pipe(take(1)).subscribe((data) => {
      console.log('get hourly value', data);
    })
  }

  getHourlyMachineLifeValue(): void {
    const machine: Machine | any = { id: '2' }
    this.dataService.getHourlyMachineLifeValue(machine).pipe(take(1)).subscribe((data) => {
      console.log('get hourly value', data);
    })
  }

}
