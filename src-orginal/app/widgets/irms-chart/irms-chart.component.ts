import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { DataPoint, DataConfig } from '../../interfaces';
import uuid from 'uuid';
import GraphUtil from '../../utils/graph.util';


const ABNORMAL_COLOR = '#ff6d00';
const NORMAL_COLOR = '#000000';

const NORMAL_FREQ_TITLE = 'Normal Machine';
const ABNORMAL_FREQ_TITLE = 'Abnormal Machine';


@Component({
    selector: 'app-irms-chart',
    templateUrl: './irms-chart.component.html',
    styleUrls: ['./irms-chart.component.scss']
})
export class IrmsChartComponent implements OnChanges, OnInit {

    readonly id: string;
    @Input() abnormalData: DataPoint[];
    @Input() normalData: DataPoint[];
    @Input() config: DataConfig;

    constructor() {
        this.id = 'd-' + uuid.v4();
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.normalData && changes.normalData.currentValue) ||
            (changes.abnormalData && changes.abnormalData.currentValue)) {
            this._renderChart();
        }
    }

    private getNormalFreqLabel() {
        return `${NORMAL_FREQ_TITLE} : ${this.config.normal.name}`;
    }

    private getAbnormalFreqLabel() {
        return `${ABNORMAL_FREQ_TITLE} : ${this.config.abnormal.name}`;
    }

    private _renderChart(): void {
        const data = [];
        if (this.abnormalData) {
            data.push({
                type: 'line',
                showInLegend: true,
                name: 'Abnormal i-rms',
                color: GraphUtil.ABNORMAL_COLOR,
                lineDashType: 'dash',
                dataPoints: this.abnormalData,
                toolTipContent: '{x}<br/> <span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
                axisXType: this.normalData ? 'secondary' : 'primary',
            });
        }
        if (this.normalData) {
            data.push({
                type: 'line',
                showInLegend: true,
                name: 'Normal i-rms',
                color: GraphUtil.NORMAL_COLOR,
                dataPoints: this.normalData,
                toolTipContent: '<span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
            });
        }


        let axisX;
        let axisX2;
        if (this.normalData && this.abnormalData) {
            axisX = { title: this.getNormalFreqLabel() };
            axisX2 = { title: this.getAbnormalFreqLabel() };
        } else if (this.abnormalData) {
            axisX = { title: this.getAbnormalFreqLabel() };
        } else {
            axisX = { title: this.getNormalFreqLabel() };
        }

        const chart = new CanvasJS.Chart('irmsChart', {
            ...GraphUtil.commonGraphOptions,
            axisX,
            axisX2,
            data
        });

        chart.render();
    }
}
