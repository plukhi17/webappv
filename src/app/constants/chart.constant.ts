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
}