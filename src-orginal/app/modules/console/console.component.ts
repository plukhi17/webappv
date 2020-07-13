import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { RouteConstant } from '../../constants';
import { NavService } from '../../services/nav.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


const MOBILE_WIDTH = 992;


@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {

    public mobileView: boolean = window.innerWidth <= MOBILE_WIDTH;     // Is mobile view active
    public applyPadding = true;
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private navService: NavService
    ) {
        if (router.url === RouteConstant.CONSOLE) {
            this.navService.navigate(RouteConstant.ANALYTICS);
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
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
