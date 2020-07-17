import { Component, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { RouteConstant } from '../../constants';
import { NavService } from '../../services/nav.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material';


const MOBILE_WIDTH = 992;


@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {

    @ViewChild('appnav') appnav: MatSidenav;
    public mobileView: boolean = window.innerWidth <= MOBILE_WIDTH;     // Is mobile view active
    public applyPadding = true;
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private navService: NavService
    ) {
        if (router.url === RouteConstant.CONSOLE) {
            this.navService.navigate(RouteConstant.MONITOR);
        }
        this.setNavigationEvent();
    }

    @HostListener('window:resize')
    onResize() {
        this.mobileView = window.innerWidth <= MOBILE_WIDTH;
    }

    ngOnInit() {
    }

    setNavigationEvent() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this.destroyed$)
        ).subscribe((route: RouterEvent) => {
            this.applyPadding = route.url !== RouteConstant.ANALYTICS;
            if (this.mobileView && this.appnav && this.appnav.opened) {
                this.appnav.close();
            }
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
