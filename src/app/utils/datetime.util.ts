import * as moment from 'moment';


export class DatetimeUtil {
    /**
     * Converts epoch timestamp to 'YYYY-MM-DD hh:mm:ss'.
     *
     * @param timestamp
     */
    static convertTimestampToDateString(timestamp: number): string {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
    static getBeginningOfTheDate(timestamp: number): string {
        return moment(timestamp).format('YYYY-MM-DD 00:00:00');
        // return moment( moment(timestamp).format(moment.HTML5_FMT.DATE) + " 00:00:00'").format('YYYY-MM-DD HH:mm:ss');
       
    }
    static getEndOfTheDate(timestamp: number): string {
        return moment(timestamp).format('YYYY-MM-DD 23:59:59');
        // return "'" + moment(timestamp).format(moment.HTML5_FMT.DATE) + " 23:59:00'";
    }
}
