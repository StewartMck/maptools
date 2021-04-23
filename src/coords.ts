import { VALID_RANGE, MATCH } from "../libs/constants";
import assert from "assert";

type LAT_LONG = string;
interface returnLAT_LONG {
  lat: string;
  long: string;
}

export default class COORDS {
  private lat: RegExpMatchArray | null;
  private long: RegExpMatchArray | null;

  constructor(lat: LAT_LONG, long: LAT_LONG) {
    this.lat = lat.match(MATCH);
    this.long = long.match(MATCH);

    if (this.lat === null || this.long === null) {
      throw new TypeError("Invalid Input");
    } else {
      long.match(/[Ww]/g) ? (this.long[0] = `-${this.long[0]}`) : this.long[0];
      lat.match(/[Ss]/g) ? (this.lat[0] = `-${this.lat[0]}`) : this.lat[0];
    }


    assert(
      this.checkRange(
        Array.isArray(this.lat) ? Number.parseFloat(this.lat[0]) : this.lat,
        VALID_RANGE.LAT_MIN,
        VALID_RANGE.LAT_MAX
      ),
      "Invalid Latitude Range", 
    );
    assert(
      this.checkRange(
        Array.isArray(this.long) ? Number.parseFloat(this.long[0]) : this.long,
        VALID_RANGE.LONG_MIN,
        VALID_RANGE.LONG_MAX
      ),
      "Invalid Longitude Range"
    );
  }

  private checkRange(degrees: number, min: VALID_RANGE, max: VALID_RANGE) {
    return degrees >= min && degrees <= max;
  }

  toDEC(precision = 7): returnLAT_LONG | Error {

    
    // Decimal Degrees = Degrees + minutes/60 + seconds/3600
    if (this.lat && this.long) {

        if(this.lat.length === 1 && this.long.length === 1) {
            const latResult = Number.parseFloat(this.lat[0]).toFixed(precision);
            const longResult = Number.parseFloat(this.long[0]).toFixed(precision);
            return {lat: latResult, long: longResult}
        }

      const [latDeg, latMin, latSec] = this.lat;
      const [longDeg, longMin, longSec] = this.long;

      const latResult = `${latDeg}.${(
        Number.parseFloat(latMin) / 60 +
        Number.parseFloat(latSec) / 3600
      )
        .toPrecision(precision)
        .match(/[^\.]\d+(\.\d+)*/g)}`;

      const longResult = `${longDeg}.${(
        Number.parseFloat(longMin) / 60 +
        Number.parseFloat(longSec) / 3600
      )
        .toPrecision(precision)
        .match(/[^\.]\d+(\.\d+)*/g)}`;

      return { lat: latResult, long: longResult };
    }
    return new TypeError("Invalid input");
  }

  toDMS() {}

//   read() {
//     console.log(`${this.lat}, ${this.long} `);
//   }
}
