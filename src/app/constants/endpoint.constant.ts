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
}
