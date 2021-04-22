import {VALID_RANGE, MATCH} from './libs/constants.js'

type LAT_LONG = string | number;

class COORDS {

    private lat: LAT_LONG;
    private long: LAT_LONG;
    
    constructor(lat: LAT_LONG, long: LAT_LONG) {
        this.lat = lat;
        this.long = long;
    }

    
    read(){
        console.log(`${this.lat}, ${this.long} `)
    }




}