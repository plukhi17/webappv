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
  MACHINES_AVAILABLE_COLOR = CHART.MONITOR_CARDS.AVAILABLE.DEFAULT;
  OVERLOADS_COLOR = CHART.MONITOR_CARDS.OVERLOADS.DEFAULT;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getPlantLifeValue();
  }

  updateCardsData(): void {
    if (this.realTimeData) {
      this.availableMachines = this.realTimeData.filter((entry) => ['Running', 'Idle'].includes(entry.availabilty_status)).length;
      let availablePercent = 0;
      if (this.realTimeData.length) {
        availablePercent = this.availableMachines * 100 / this.realTimeData.length;
        if (availablePercent < 40) {
          this.MACHINES_AVAILABLE_COLOR = CHART.MONITOR_CARDS.AVAILABLE.LESS_THAN_40;
        } else if (availablePercent < 90) {
          this.MACHINES_AVAILABLE_COLOR = CHART.MONITOR_CARDS.AVAILABLE.LESS_THAN_90;
        } else {
          this.MACHINES_AVAILABLE_COLOR = CHART.MONITOR_CARDS.AVAILABLE.DEFAULT;
        }
      }
      this.overloadedMachines = this.realTimeData.filter((entry) => entry.overload).length;
      if (this.overloadedMachines < 80) {
        this.OVERLOADS_COLOR = CHART.MONITOR_CARDS.OVERLOADS.UPTO_80;
      } else {
        this.OVERLOADS_COLOR = CHART.MONITOR_CARDS.OVERLOADS.DEFAULT;
      }
    }
  }

  getPlantLifeValue(): void {
    this.dataService.getPlantLifeValue().pipe(take(1)).subscribe((data: {
      present_plant_life_value: number
      previous_plant_life_value: number
    }) => {
      if (data) {
        if (data.present_plant_life_value !== null && data.present_plant_life_value !== undefined) {
          this.plantLifeValue = data.present_plant_life_value;
        } else {
          this.plantLifeValue = null;
        }
      }
    })
  }

}
