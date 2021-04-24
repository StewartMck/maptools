import { FORMAT, VALID_RANGE , MATCH } from "../libs/constants";
// import assert from "assert";

type LAT_LONG = string;
// interface returnLAT_LONG {
//   lat: string;
//   long: string;
// }

interface processedLAT_LONG {
  value: Array<any> | null;
  signed: boolean;
  format: FORMAT | null;
  input: number | string;
}

export default class COORDS {
  private lat: processedLAT_LONG;
  private long: processedLAT_LONG;

  constructor(lat: LAT_LONG, long: LAT_LONG) {
   
    this.lat = { value: null, signed: false, format: null, input: lat };
    this.long = { value: null, signed: false, format: null, input: long };

    this.lat.value = lat.match(MATCH);
    this.long.value = long.match(MATCH);

    if (this.lat.value === null || this.long.value === null) {
      throw new TypeError("Invalid Input");
    }

    this.lat.signed = this.checkSigned(this.lat, lat);
    this.long.signed = this.checkSigned(this.long, long);
    
    this.lat.value = this.lat.value.map((e) => Number(e))
    this.long.value = this.long.value.map((e) => Number(e))
    
    if (!this.checkRange(this.lat.value[0], VALID_RANGE.LAT_MIN, VALID_RANGE.LAT_MAX)) {
      throw new TypeError("Invalid Range: Lat");
    }
    if (!this.checkRange(this.long.value[0], VALID_RANGE.LONG_MIN, VALID_RANGE.LONG_MAX)) {
      throw new TypeError("Invalid Range: Long");
    }
  
    this.lat.value[0] = Math.abs(Number(this.lat.value![0]));
    this.long.value[0] = Math.abs(Number(this.long.value![0]));

    this.lat.format = this.checkFormat(this.lat)
    this.long.format = this.checkFormat(this.long)

  }

  private checkRange(degrees: number, min: VALID_RANGE, max: VALID_RANGE) {
    return degrees >= min && degrees <= max;
  }

  private checkSigned(lat_long: processedLAT_LONG, input: string) {
    const { value } = lat_long;
    input.match(/[Ww]/g) ? (value![0] = `-${value![0]}`) : value![0];
    input.match(/[Ss]/g) ? (value![0] = `-${value![0]}`) : value![0];
    return value![0].charAt(0) === "-" ? true : false;
  }

  private checkFormat(lat_long: processedLAT_LONG) {
    switch (lat_long.value?.length) {
      case 1:
        return FORMAT.DEC;
      case 2:
       return FORMAT.DDM;
      case 3:
        return FORMAT.DMS;
    }
    return null;
  }

  // private convertdms(lat_long: RegExpMatchArray, type: string) {
  //   const signed = lat_long![0].charAt(0) === '-' ? true : false;

  //   const decDeg = Math.abs(Number.parseFloat(lat_long![0]));
  //   const deg = Math.abs(Number.parseInt(lat_long![0]));
  //   const min = Math.round((decDeg - deg) * 60)
  //   const sec = (((decDeg - deg) - min/60) * 3600).toFixed(2);
  //   const cardinalLat = signed && type === 'lat' ? 'S' : 'N';
  //   const cardinalLong = signed && type === 'long' ? 'W' : 'E';

  //   return `${type === 'lat' ? cardinalLat : cardinalLong}${deg}°${min}'${sec}''`
  // }

  //   toDEC(precision = 7): returnLAT_LONG | Error {
  //     // Decimal Degrees = Degrees + minutes/60 + seconds/3600
  //     if (this.lat && this.long) {
  //       if (this.lat.length === 1 && this.long.length === 1) {
  //         const latResult = Number.parseFloat(this.lat[0]).toFixed(precision);
  //         const longResult = Number.parseFloat(this.long[0]).toFixed(precision);
  //         return { lat: latResult, long: longResult };
  //       }

  //       const [latDeg, latMin, latSec] = this.lat;
  //       const [longDeg, longMin, longSec] = this.long;

  //       const latResult = `${latDeg}.${(
  //         Number.parseFloat(latMin) / 60 +
  //         Number.parseFloat(latSec) / 3600
  //       )
  //         .toPrecision(precision)
  //         .match(/[^\.]\d+(\.\d+)*/g)}`;

  //       const longResult = `${longDeg}.${(
  //         Number.parseFloat(longMin) / 60 +
  //         Number.parseFloat(longSec) / 3600
  //       )
  //         .toPrecision(precision)
  //         .match(/[^\.]\d+(\.\d+)*/g)}`;

  //       return { lat: latResult, long: longResult };
  //     }
  //     return new TypeError("Invalid input");
  //   }

  //   toDMS() {
  //       /*
  //       DMS = d + m + s
  //       d = int(DEC)
  //       m = int(DEC - d * 60)
  //       s = (DEC - d - m/60) * 3600
  //       */

  //       if(this.lat?.length === 3 && this.long?.length === 3) {
  //         const lat = `${this.lat[0]}°${this.lat[1]}'${this.lat[2]}"`;
  //         const long = `${this.long[0]}°${this.long[1]}'${this.long[2]}"`;
  //         return {lat, long};
  //       }

  //       return {lat: this.convertdms(this.lat!, 'lat'), long: this.convertdms(this.long!, 'long')}

  // }
}
