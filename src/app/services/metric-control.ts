
const tempControl = (temp:number):number => Math.round(temp);
const pressureControl = (pressure: number) => Math.round(pressure / 1.333);
const probabilityControl = (probability: number):number => Math.round(probability * 100);

export const metricControl = {
    temperature: tempControl,
    pressure: pressureControl,
    probability: probabilityControl
}


