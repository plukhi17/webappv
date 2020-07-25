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
    static readonly MONITOR_HEALTH_DONUT = {
        NORMAL: {
            color: "#66CDAA"
        },
        WARNING: {
            color: "#FFA500"
        },
        CRITICAL: {
            color: "#FF4500"
        }
    }
    static readonly MONITOR_AVAILABILITY_DONUT = {
        RUNNING: {
            color: "#4682B4"
        },
        IDLE: {
            color: "#F08080"
        },
        STOPPED: {
            color: "#A9A9A9"
        }
    }
    static readonly MONITOR_CARDS = {
        AVAILABLE: {
            DEFAULT: '#3EDAD7',
            LESS_THAN_90: '#FFD700',
            LESS_THAN_40: '#DC143C'
        },
        OVERLOADS: {
            DEFAULT: '#DC143C',
            UPTO_80: '#FFD700'
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