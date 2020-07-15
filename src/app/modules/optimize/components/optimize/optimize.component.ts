import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.scss']
})
export class OptimizeComponent implements OnInit {

  public machines: Machine[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this._fetchMachines();
  }

  /**
   * Fetch all equipments.
   *
   * @private
   */
  private _fetchMachines(): void {
    this.dataService.fetchAllMachines().pipe(
      tap((machines: Machine[]) => this.machines = machines),
      take(1)
    ).subscribe();
  }

}
