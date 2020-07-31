import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavNode } from '../../../interfaces';
import { RouteConstant } from '../../../constants';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs/operators';


const NAV_TREE: NavNode[] = [
    // {
    //     icon: 'bubble_chart',
    //     name: 'Overview',
    //     path: RouteConstant.OVERVIEW
    // },
    {
        icon: 'monitor',
        name: 'Monitor',
        path: RouteConstant.MONITOR,
    },
    {
        icon: 'analytics',
        name: 'Analyse',
        path: RouteConstant.ANALYTICS_MODULE,
    },
 
    {
        icon: 'dashboard',
        name: 'Diagnose',
        path: RouteConstant.DASHBOARD,
    },
    {
        icon: 'tune',
        name: 'Optimize',
        path: RouteConstant.OPTIMIZE,
    },
    
];


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy, OnInit {

    public activePath: string;
    public navTree: NavNode[] = NAV_TREE;

    private unsubscribe: Subject<void> = new Subject();

    constructor(private router: Router) {
        this._subscribeToUrl();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Subscribe to url changes.
     *
     * @private
     */
    private _subscribeToUrl(): void {
        this.activePath = this.router.url;
        this.router.events.pipe(
            takeUntil(this.unsubscribe),
            filter((event) => event instanceof NavigationEnd),
            tap((event: NavigationEnd) => this.activePath = event.url)
        ).subscribe();
    }
}
