// import COORDS from './coords';

interface LAT_LONG {
    lat: string;
    long: string;
}

enum DISTANCE_FORMAT {
    KM = 6371,
    M = 6371e3,
    NM = 3440.1 
}

export function distance (lat_long: Array<LAT_LONG>, format: string = 'M') {
    if(!DISTANCE_FORMAT[<any>format]){
        throw TypeError('Invalid output format')
}
    const radius = Number(DISTANCE_FORMAT[<any>format]);

    const distance = [];
    let index = 0;
    while (index < lat_long.length - 1) {
        const {lat: lat1, long: long1} = lat_long[index];
        const {lat: lat2, long: long2} = lat_long[index + 1];

        const phi1 = Number(lat1) * Math.PI/180;
        const phi2 = Number(lat2) * Math.PI / 180;
        const delta_phi = (Number(lat2) - Number(lat1)) * Math.PI / 180;
        const delta_lambda = (Number(long2) - Number(long1)) * Math.PI / 180;
        const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance.push(radius * c)
        index++;
    }

    console.log(distance)
    
}

// const centre = () => {
    
// }

