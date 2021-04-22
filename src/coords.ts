import {VALID_RANGE, MATCH} from '../libs/constants'
import assert from 'assert'

type LAT_LONG = string | number;

export default class COORDS {

    private lat: RegExpMatchArray | number | null
    private long: RegExpMatchArray | number | null
    
    constructor(lat: LAT_LONG, long: LAT_LONG) {
        
        this.lat = typeof lat === 'string' ? lat.match(MATCH): lat;
        this.long = typeof long === 'string' ? long.match(MATCH) : long;

        if (this.lat === null || this.long === null) {
            throw new Error('invalid input')
        }

        assert(
            this.checkRange(Array.isArray(this.lat) ? Number.parseFloat(this.lat[0]) : this.lat, VALID_RANGE.LAT_MIN, VALID_RANGE.LAT_MAX)
            , "Invalid Latitude Range")
        assert(
            this.checkRange(Array.isArray(this.long) ? Number.parseFloat(this.long[0]) : this.long, VALID_RANGE.LONG_MIN, VALID_RANGE.LONG_MAX)
            , "Invalid Longitude Range")    
        
    }

    private checkRange(degrees: number, min: VALID_RANGE, max: VALID_RANGE){
        return degrees >= min && degrees <= max;
    }


     
    
    read(){
        console.log(`${this.lat}, ${this.long} `)
    }




}