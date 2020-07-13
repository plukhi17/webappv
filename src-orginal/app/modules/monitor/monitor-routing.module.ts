import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MonitorRealComponent } from './monitor-real.component';


const routes: Routes = [
    {path: '', component: MonitorRealComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitorRoutingModule {
}
