'use strict';
export interface Temperature {
    

    /**
     * Unique identifier of the thermostat.
     */
    thermostatId?: string;

    /**
     * Current temperature of thermostat.
     */
    currentTemperature?: string;

    /**
     * Previous temperature of thermostat.
     */
    previousTemperature?: string;

    /**
     * Id of user linked to thermostat.
     */
    userId?: string;
}
