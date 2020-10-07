export interface RealTimeData {
    availabilty_status: string;
    description: string;
    device_status: string;
    equipment_status: string;
    equipment_type: string;
    fault: string;
    health_status: string;
    i_rms: number;
    id: number;
    idle: number;
    idle_time_in_hrs: number;
    instant_power: number;
    name: string;
    overload: boolean;
    rated_current: number;
    riskscore: number;
    running: number;
    stopped: number;
    telemetry_time: string;
    warning_count: number;
    avg_riskscore:number;
    avg_health_status:string;
    running_in_hrs:number;
}
