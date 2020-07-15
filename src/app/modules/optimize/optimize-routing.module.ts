import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptimizeComponent } from './components/optimize/optimize.component';

const routes: Routes = [
  {
    path: '', component: OptimizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptimizeRoutingModule { }
