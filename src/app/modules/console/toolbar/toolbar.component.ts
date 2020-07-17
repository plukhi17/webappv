import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { RouteConstant } from '../../../constants';
import { AuthService } from '../../../services/auth.service';
import { take, tap } from 'rxjs/operators';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() mobileView: boolean = false;
    @Output() toggleNavbar: EventEmitter<void> = new EventEmitter();

    public userName: string;

    constructor(private authService: AuthService,
        private navService: NavService) {
        this._fetchPrincipal();
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
}
