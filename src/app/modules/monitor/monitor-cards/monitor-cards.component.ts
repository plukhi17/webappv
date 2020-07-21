import { Component, OnInit, Input } from '@angular/core';
import { RealTimeData } from 'src/app/interfaces/realtim-data.interface';
import { CHART } from 'src/app/constants/chart.constant';
import { DataService } from 'src/app/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-monitor-cards',
  templateUrl: './monitor-cards.component.html',
  styleUrls: ['./monitor-cards.component.scss']
})
export class MonitorCardsComponent implements OnInit {

  private _realTimeData: RealTimeData[];
  @Input('data')
  public get realTimeData(): RealTimeData[] {
    return this._realTimeData;
  }
  public set realTimeData(value: RealTimeData[]) {
    this._realTimeData = value;
    this.updateCardsData();
  }

  availableMachines = 0;
  overloadedMachines = 0;
  plantLifeValue = null;

  cardColors = CHART.MONITOR_CARDS;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getPlantLifeValue();
  }

  updateCardsData(): void {
    if (this.realTimeData) {
      this.availableMachines = this.realTimeData.filter((entry) => ['Running', 'Idle'].includes(entry.availabilty_status)).length;
      // this.overloadedMachines = this.realTimeData.filter((entry) => entry.overload).length;
      this.overloadedMachines = Math.round(Math.random() * 100);
    }
  }

  getPlantLifeValue(): void {
    this.dataService.getPlantLifeValue().pipe(take(1)).subscribe((data: {
      plant_life_value: number
      previous_plant_life_value: number
    }) => {
      if (data) {
        if (data.plant_life_value !== null && data.plant_life_value !== undefined) {
          this.plantLifeValue = data.plant_life_value;
        } else {
          this.plantLifeValue = null;
        }
      }
    })
  }

}
