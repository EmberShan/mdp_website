import { scaleLinear } from "d3-scale";

export const meterToPx = ({valuInMeter, maxImgWidth}) => {
    // meter to px
    const changeUnits = scaleLinear()
            .domain([0, 80]) //meter
            .range( [0, maxImgWidth] ); //px
    return changeUnits(valuInMeter);
    
}; 

