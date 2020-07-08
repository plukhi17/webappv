/**
 * @description : Common Options for Canvas.JS Graph
 */
export default class GraphUtil {

    // Abnormal color for line, marker and legend
    static ABNORMAL_COLOR =  '#F44336';//'#ff6d00';

    static ABNORMAL_COLOR_AGGREGATE = '#EF9A9A';//'#ff1d00'

    // Normal color for line, marker and legend
    // static NORMAL_COLOR = '#0000ff';
    static NORMAL_COLOR = '#696969';//'rgb(15, 77, 138)';

    static NORMAL_COLOR_AGGREGATE = '#2F4F4F';//'#8a0f4d';
    // Stripes color for line
    static STRIP_COLOR = '#000';

    static commonGraphOptions = {
        animationEnabled: true,
        axisY: {
            crosshair: {
                enabled: true
            }
        },
        toolTip: {
            shared: 'true'
        },
        legend: {
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            cursor: 'pointer',
            itemclick: (e) => {
                e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
                e.chart.render();
            },
        },
        zoomEnabled: true,
    };
}
