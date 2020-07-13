import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { Subject, interval } from 'rxjs';
import { flatMap, takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-monitor-real',
  templateUrl: './monitor-real.component.html',
  styleUrls: ['./monitor-real.component.scss']
})
export class MonitorRealComponent implements OnInit, OnDestroy {

  data: RealTimeData[] = [];
  unsubscribe$: Subject<void> = new Subject();

  API_INTERVAL = 2 * 60 * 1000 // 2 minutes

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getRealtimeMetrics();
    interval(this.API_INTERVAL).pipe(
      takeUntil(this.unsubscribe$),
      flatMap(() => this.dataService.getRealtimeMetrics())).subscribe((data) => {
        console.log('real time martrics', data);
        this.data = data;
      });
  }

  getRealtimeMetrics(): void {
    this.dataService.getRealtimeMetrics().pipe(take(1)).subscribe((data) => {
      console.log('real time martrics', data);
      this.data = data;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
