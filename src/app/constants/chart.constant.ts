export class CHART {
    static readonly MONITOR_REALTIME = {
        API_INTERVAL: 2 * 60 * 1000 // 2 minutes
    }
    static readonly MONITOR_PIE = {
        colors: ["#4F81BC", "#e0d360", "#BF4E85"]
    }
    static readonly MONITOR_SEMIPIE = {
        RUNNING: {
            color: "#4F81BC"
        },
        IDLE: {
            color: "#e0d360"
        },
        STOPPED: {
            color: "#BF4E85"
        }
    }
    static readonly ANALYSIS_PIE = {
        RUNNING: {
            color: "#4F81BC"
        },
        IDLE: {
            color: "#e0d360"
        },
        STOPPED: {
            color: "#BF4E85"
        }
    }
    static readonly MONITOR_CARDS = {
        AVAILABLE: {
            color: '#3EDAD7'
        },
        OVERLOADS: {
            color: '#37C9F0'
        },
        INDICATOR: {
            color: '#2C91D5'
        }
    }
    static readonly MONITOR_HEAT = {
        RISKSCORE: {
            minColor: '#7AAC8D',
            maxColor: '#DE3B00'
        },
        AVAILABILITY: {
            minColor: '#DE3B00',
            maxColor: '#7AAC8D'
        }
    }
    static readonly MONITOR_TOP_MACHINES = {
        RUNNING: {
            color: "#00C2CB"
        },
        IDLE: {
            color: "#FF5757"
        },
        STOPPED: {
            color: "#C0C1C3"
        }
    }
}