import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/analytics/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { StorageService } from 'src/app/services/storage.service';
import { StorageConstant } from 'src/app/constants';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {

  destroyed$ = new Subject<boolean>();
  dashboardLoaded = false;
  constructor(
    private analyticService: ApiService
  ) { }

  ngAfterViewInit() {
    this.getAnalyticsUrl();
  }

  getAnalyticsUrl() {
    this.analyticService.getIFrame(StorageService.getItem(StorageConstant.PLANT_ID))
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(
        response => {
          this.dashboardLoaded = true;

          const params = {
            url: `${response.body.EmbedUrl}#p.tenantId=${StorageService.getItem(StorageConstant.TENANT_ID)}&p.plantId=${StorageService.getItem(StorageConstant.PLANT_ID)}`,
            container: document.getElementById('analyticsContainer'),
            height: 'AutoFit',
            loadingHeight: '700px',
            scrolling: 'auto'
          };
          try {
            const dashboard = embedDashboard(params);
            // Ref: https://github.com/awslabs/amazon-quicksight-embedding-sdk
            dashboard.on('SHOW_MODAL_EVENT', () => {
              window.scrollTo({
                top: 0 // iFrame top position
              });
            });
            dashboard.on('error', (error) => {
              console.log('error', error);
              this.onError(error);
            });
            dashboard.on('load', (payload) => {
              (document.getElementsByClassName('quicksight-embedding-iframe')[0] as any).style.border = 0;
              console.log('dashboard payload', payload);
              this.onVisualLoaded();
            });
          } catch (error) {
            console.log('error', error);

          }

        },
        error => {
          this.dashboardLoaded = true;
          console.log('error', error);
        }
      )
  }

  onVisualLoaded() {
    console.log("Dashboard fully loaded");
  }

  onError(error: any) {
    console.log('error', error);
    console.log("your seesion has expired");
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
