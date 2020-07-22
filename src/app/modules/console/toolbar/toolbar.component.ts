import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { RouteConstant } from '../../../constants';
import { AuthService } from '../../../services/auth.service';
import { take, tap, takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Plant } from 'src/app/interfaces/plant.interface';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    @Input() mobileView: boolean = false;
    @Input() plants: Plant[] = [];
    @Input() selectedPlant: Plant;
    @Output() toggleNavbar: EventEmitter<void> = new EventEmitter();
    @Output() plantChange: EventEmitter<Plant> = new EventEmitter();

    public userName: string;
    public activePath: string;
    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private router: Router,
        private authService: AuthService,
        private navService: NavService) {
        this._fetchPrincipal();
        this._subscribeToUrl();
    }

    ngOnInit() {
    }

    toggle(): void {
        this.toggleNavbar.emit();
    }

    logout(): void {
        this.navService.navigate(RouteConstant.LOGIN);
    }

    private _fetchPrincipal(): void {
        this.authService.getUserPayload().pipe(
            tap((payload: any) => this.userName = payload.name),
            take(1)
        ).subscribe();
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

    onPlantChange(plant: Plant): void {
        if (!this.selectedPlant || plant.id != this.selectedPlant.id) {
            this.plantChange.emit(plant);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
