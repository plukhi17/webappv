import { Component, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { RouteConstant, StorageConstant } from '../../constants';
import { NavService } from '../../services/nav.service';
import { filter, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { Plant } from 'src/app/interfaces/plant.interface';
import { StorageService } from 'src/app/services/storage.service';


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
    plants: Plant[] = [];
    selectedPlant: Plant;
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private navService: NavService,
        private dataService: DataService,
        private storageService: StorageService
    ) {
        if (router.url === RouteConstant.CONSOLE) {
            this.navService.navigate(RouteConstant.MONITOR);
        }
        this.getPlants();
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

    getPlants(): void {
        this.dataService.getPlants().pipe(take(1)).subscribe((plants: Plant[]) => {
            this.plants = plants;
            if (this.plants && this.plants.length) {
                // const plant = JSON.parse(JSON.stringify(this.plants[0]));
                // plant.id = 13;
                // plant.name = "Micro Foundary Plant"
                // this.plants.push(plant);
                const selectedPlantId = StorageService.getItem(StorageConstant.PLANT_ID);
                if (selectedPlantId !== null && selectedPlantId !== undefined) {
                    if (this.plants.filter((p) => p.id == +selectedPlantId).length) {
                        this.selectedPlant = this.plants.filter((p) => p.id == +selectedPlantId)[0];
                    }
                }
                if (!this.selectedPlant) {
                    this.selectedPlant = this.plants.filter((p) => p.id == +selectedPlantId)[0];
                    StorageService.setItem(StorageConstant.PLANT_ID, this.selectedPlant.id + '');
                    window.location.reload();
                }
            }
        });
    }

    onPlantChange(plant: Plant): void {
        if (plant) {
            StorageService.setItem(StorageConstant.PLANT_ID, plant.id + '');
            window.location.reload();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
