import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsoleComponent} from './console.component';
import {RouteConstant} from '../../constants';


const routes: Routes = [
    {
        path: '',
        component: ConsoleComponent,
        children: [
            {path: 'overview', loadChildren: '../analytics/analytics.module#AnalyticsModule'},
            {path: 'machine-insights', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
             {path: 'monitor-real', loadChildren: '../monitor/monitor.module#MonitorModule'},
            // {path: '**', redirectTo: RouteConstant.ANALYTICS, pathMatch: 'full'},
        ]
    },
       
    // {path: 'monitor-real', loadChildren: '../monitor/monitor.module#MonitorModule'},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsoleRoutingModule {
}
