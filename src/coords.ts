import {
  FORMAT,
  VALID_RANGE,
  FORMAT_INPUT,
  MATCH_BEHIND_DECIMAL,
  TYPE,
} from "../libs/constants";

type LAT_LONG = string | number;
interface returnLAT_LONG {
  lat: string;
  long: string;
}

interface processedLAT_LONG {
  value: Array<number> | null;
  signed: boolean;
  format: FORMAT | null;
  input: number | string;
}

/**
 * Creates a new COORDS object
 *
 * @class
 * @param lat - Latitude of type DEC, DMS, DDM
 * @param long - Longitude of type DEC, DMS, DDM
 * @returns Array of numbers
 *
 */
export default class COORDS {
  private lat: processedLAT_LONG;
  private long: processedLAT_LONG;

  constructor(lat: LAT_LONG, long: LAT_LONG) {
    this.lat = { value: null, signed: false, format: null, input: lat };
    this.long = { value: null, signed: false, format: null, input: long };

    const inputLat = typeof lat === "string" ? lat.match(FORMAT_INPUT) : [lat];
    const inputLong =
      typeof long === "string" ? long.match(FORMAT_INPUT) : [long];

    if (inputLat === null || inputLong === null) {
      throw new TypeError("Invalid Input");
    }
    if (inputLat.length === 0 || inputLong.length === 0) {
      throw new TypeError("Input cannot be empty");
    }

    this.lat.signed = this.checkSigned(inputLat, lat);
    this.long.signed = this.checkSigned(inputLong, long);

    // convert string to number in the array
    this.lat.value = inputLat.map((e: string | number) => Number(e));
    this.long.value = inputLong.map((e: string | number) => Number(e));

    if (
      !this.checkRange(
        this.lat.value[0],
        VALID_RANGE.LAT_MIN,
        VALID_RANGE.LAT_MAX
      )
    ) {
      throw new TypeError("Invalid Range: Lat");
    }
    if (
      !this.checkRange(
        this.long.value[0],
        VALID_RANGE.LONG_MIN,
        VALID_RANGE.LONG_MAX
      )
    ) {
      throw new TypeError("Invalid Range: Long");
    }

    // normalize the deg portion of the coordinates
    this.lat.value[0] = Math.abs(Number(this.lat.value![0]));
    this.long.value[0] = Math.abs(Number(this.long.value![0]));

    this.lat.format = this.checkFormat(this.lat);
    this.long.format = this.checkFormat(this.long);
  }

  private checkRange(degrees: number, min: VALID_RANGE, max: VALID_RANGE) {
    return degrees >= min && degrees <= max;
  }

  private checkSigned(
    lat_long: Array<string | number>,
    input: string | number
  ) {
    let [deg] = lat_long;
    if (typeof input === "string") {
      input.match(/[Ww]/g) ? (deg = `-${deg}`) : deg;
      input.match(/[Ss]/g) ? (deg = `-${deg}`) : deg;
    }
    return deg.toString().charAt(0) === "-" ? true : false;
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

  private convertdms({ value, signed, format }: processedLAT_LONG, type: TYPE) {
    const decDeg = value![0];
    const deg = ~~value![0];
    let min = 0;
    let sec = 0;
    if (format === FORMAT.DEC) {
      min = Math.round((decDeg - deg) * 60);
      sec = Number(((decDeg - deg - min / 60) * 3600).toFixed(2));
    } else if (format === FORMAT.DDM) {
      min = ~~value![1];
      sec = Number(((value![1] - min) * 60).toFixed(2));
    }

    const cardinalLat = signed && type === TYPE.LAT ? "S" : "N";
    const cardinalLong = signed && type === TYPE.LONG ? "W" : "E";

    return `${
      type === TYPE.LAT ? cardinalLat : cardinalLong
    }${deg}°${min}'${sec}"`;
  }

  private convertddm(
    { value, signed, format }: processedLAT_LONG,
    type: TYPE
  ) {
    
    const decDeg = value![0];
    const deg = ~~value![0];
    let min = 0;

    switch (format) {
      case FORMAT.DDM:
        min = value![1];
        break;
      case FORMAT.DEC:
        min = Number(((decDeg - deg) * 60).toFixed(4));
        break;
      case FORMAT.DMS:
        min = value![1] + value![2] / 60;
        break;
    }

    const cardinalLat = signed && type === TYPE.LAT ? "S" : "N";
    const cardinalLong = signed && type === TYPE.LONG ? "W" : "E";

    return `${type === TYPE.LAT ? cardinalLat : cardinalLong}${deg}°${min}'`;
  }

  /**
   * Converts coordinates to Decimal Degree format:
   * @param precision optional number from 0 - 7, default is 5
   * @returns lat: "dd.ddddd", long: "dd.ddddd"
   */
  toDEC(precision = 5) {
    if (this.lat.format === FORMAT.DEC && this.long.format === FORMAT.DEC) {
      const latResult = `${
        this.lat.signed ? "-" : ""
      }${this.lat.value![0].toFixed(precision)}`;
      const longResult = `${
        this.long.signed ? "-" : ""
      }${this.long.value![0].toFixed(precision)}`;
      return { lat: latResult, long: longResult };
    }

    if (this.lat.format === FORMAT.DMS && this.long.format === FORMAT.DMS) {
      const [latDeg, latMin, latSec] = this.lat.value!;
      const [longDeg, longMin, longSec] = this.long.value!;
      const latResult = `${this.lat.signed ? "-" : ""}${latDeg}.${(
        latMin / 60 +
        latSec / 3600
      )
        .toPrecision(precision)
        .match(MATCH_BEHIND_DECIMAL)}`;
      const longResult = `${this.long.signed ? "-" : ""}${longDeg}.${(
        longMin / 60 +
        longSec / 3600
      )
        .toPrecision(precision)
        .match(MATCH_BEHIND_DECIMAL)}`;
      return { lat: latResult, long: longResult };
    }

    if (this.lat.format === FORMAT.DDM && this.long.format === FORMAT.DDM) {
      const [latDeg, latMin] = this.lat.value!;
      const [longDeg, longMin] = this.long.value!;
      const latResult = `${this.lat.signed ? "-" : ""}${latDeg}.${(latMin / 60)
        .toPrecision(precision)
        .match(MATCH_BEHIND_DECIMAL)}`;
      const longResult = `${this.long.signed ? "-" : ""}${longDeg}.${(
        longMin / 60
      )
        .toPrecision(precision)
        .match(MATCH_BEHIND_DECIMAL)}`;
      return { lat: latResult, long: longResult };
    }

    return new TypeError("Values are not of the same type");
  }

  toDMS() {
    if (this.lat.format === FORMAT.DMS && this.long.format === FORMAT.DMS) {
      const lat = `${this.lat.signed ? "S" : "N"}${this.lat.value![0]}°${
        this.lat.value![1]
      }'${this.lat.value![2]}"`;
      const long = `${this.long.signed ? "W" : "E"}${this.long.value![0]}°${
        this.long.value![1]
      }'${this.long.value![2]}"`;
      return { lat, long };
    }

    return {
      lat: this.convertdms(this.lat!, TYPE.LAT),
      long: this.convertdms(this.long!, TYPE.LONG),
    };
  }

  toDDM() {
    return {
      lat: this.convertddm(this.lat!, TYPE.LAT),
      long: this.convertddm(this.long!, TYPE.LONG),
    };
  }

  private static convert(
    input: Array<string | number>,
    format: FORMAT
  ): Array<returnLAT_LONG> {
    const coords: Array<any> = [];
    if (input.length % 2 === 0 && input.length !== 0) {
      let index = 0;
      while (index < input.length) {
        switch (format) {
          case FORMAT.DEC:
            coords.push(new COORDS(input[index], input[index + 1]).toDEC());
            break;
          case FORMAT.DMS:
            coords.push(new COORDS(input[index], input[index + 1]).toDMS());
            break;
          case FORMAT.DDM:
            coords.push(new COORDS(input[index], input[index + 1]).toDDM());
            break;
        }
        index = index + 2;
      }
    } else {
      throw new TypeError("One or more lat/long pairs invalid");
    }
    return coords;
  }

  static batchDEC(input: Array<string | number>): Array<any> {
    return COORDS.convert(input, FORMAT.DEC);
  }

  static batchDMS(input: Array<string | number>): Array<any> {
    return COORDS.convert(input, FORMAT.DMS);
  }

  static batchDDM(input: Array<string | number>): Array<any> {
    return COORDS.convert(input, FORMAT.DDM);
  }
}
