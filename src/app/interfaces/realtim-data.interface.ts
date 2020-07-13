export interface RealTimeData {
    id: string;
    name: string;
    description: string;
    ratedcurrent: string;
    lastupdatedtime: string;
    starts: number;
    avgcurrent: number;
    avgriskscore: number;
    status: string;
    runningpercent: number;
    idlepercent: number;
    stoppedpercent: number;
    fault: string;
    overloads: number;
    availabiltystatus: string;
}