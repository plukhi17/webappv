export abstract class EndpointConstant {
    static readonly GET_EQUIPMENTS = 'get-equipments';
    static readonly GET_TRANSFORMED_DATA = 'get-transformeddata';
    static readonly GET_TRANSFORMED_DATA_AGGREGATE = 'get-aggregated-dfft-data';

    static readonly GET_TRANSFORMED_DATA_FFT = 'get-fftdata';
    static readonly GET_TRANSFORMED_DATA_FFT_AGGREGATE = 'get-aggregated-fft-data';

    static readonly GET_MACHINE_AVAILABILITY_STATUS = 'get-hourly-aggregated-data';

    // static readonly GET_AVG_FAULT_FREQUENCY = 'get-avgfaultfrequencies';

    static readonly GET_AVG_FAULT_FREQUENCY = 'get-ffa-data';
    static readonly GET_IRMS_FREQUENCY = 'get-irmsdata';
    static readonly POST_EQUIPMENT_FAULT_INSTANCES = 'post-equipmentfaultinstances';

    static readonly GET_PLANTS = 'plants';

    // monitor-realtime apis
    static readonly GET_MACHINES_REALTIME_METRICS = 'get-machines-realtime-metrics';
    static readonly GET_ALL_MACHINES_DAYWISE_AGGREGATED_DATA = 'get-all-machines-daywise-aggregated-data';
    static readonly GET_ALL_MACHINES_HOURLY_AGGREGATED_DATA = 'get-all-machines-hourly-aggregated-data';
    static readonly GET_PLANT_LIFE_VALUE = 'get-plant-life-value';
    static readonly GET_HOURLY_PLANT_LIFE_VALUE = 'get-hourly-plant-life-value';
    static readonly GET_HOURLY_MACHINE_LIFE_VALUE = 'get-hourly-machine-life-value';

    static readonly GET_REALTIME_METRICS = 'get-realtime-metrics';
    static readonly GET_DAYWISE_AGGREGATED_dATA = 'get-daywise-aggregated-data';
    static readonly GET_HOURLY_AGGREGATED_dATA = 'get-hourly-aggregated-data';

    static readonly GET_DAYWISE_AGGREGATED_METRICS = 'get-daywise-aggregated-metrics';
    static readonly GET_HOURLY_AGGREGATED_METRICS = 'get-hourly-aggregated-metrics';
}
